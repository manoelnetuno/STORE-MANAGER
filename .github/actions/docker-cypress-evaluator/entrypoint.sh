#!/bin/bash

set -x

export CY_CLI=true
current_action_folder=$GITHUB_ACTION_PATH
project_root_folder=$PWD
tests_folder=$INPUT_TESTS_FOLDER     # Folder where npm test will run, relative to project root
compose_folder=$INPUT_COMPOSE_FOLDER # docker-compose.yml folder
run_compose=$INPUT_RUN_COMPOSE       # Run compose before running tests
wait_for_url=$INPUT_WAIT_FOR_URL     # App URL to wait before testing

echo Updating system
sudo apt-get update

# https://docs.cypress.io/guides/continuous-integration/introduction#Dependencies
echo Installing cypress dependencies
sudo apt-get install -y libgtk2.0-0 libgtk-3-0 libgbm-dev libnotify-dev libgconf-2-4 libnss3 libxss1 libasound2 libxtst6 xauth xvfb

echo Installing project dependencies
npm install

if [ -n "$run_compose" ]; then
  # Trying to start student compose
  if ! (cd "$compose_folder" && docker-compose up -d --build); then
    echo Compose execution error
    exit 1
  fi
fi

if [ -n "$wait_for_url" ]; then
  # Start server if not using compose
  if [ -z "$run_compose" ]; then
    npm start
  fi

  # Waiting for server until timeout
  echo Waiting for the application server to start
  npx wait-on -t 30000 "$wait_for_url"
fi

if [ -n "$tests_folder" ]; then
  cd "$tests_folder" || true
fi

npx cypress install
npx cypress verify

echo Running tests in "$PWD"
CY_MULTI_REPORTER=1 npm test

echo Tests done, parsing results
npx mochawesome-merge cypress/reports/*.json >output.json

node "$current_action_folder"/evaluator.js output.json "$project_root_folder"/.trybe/requirements.json "$project_root_folder"/result.json

if [ -n "$compose_folder" ] && [ -n "$INPUT_RUN_COMPOSE" ]; then
  echo Stopping Docker Compose
  (cd "$compose_folder" && docker-compose down --remove-orphans &>/dev/null)
fi

echo Sending results to action output
echo "result=$(base64 -w 0 <"$project_root_folder"/result.json)" >>"$GITHUB_OUTPUT"
