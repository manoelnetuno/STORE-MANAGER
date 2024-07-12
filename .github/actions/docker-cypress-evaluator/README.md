# docker-cypress-evaluator-action v1.0

Docker Cypress evaluator action for Tryber projects

This action evaluate Tryber projects with [Cypress](https://www.cypress.io) library, but it can use Docker and Docker Compose commands on testing.

Based on <https://github.com/betrybe/docker-jest-evaluator-action/tree/v1.1> and <https://github.com/betrybe/cypress-evaluator-action/tree/v8.1>.

⚠️ **Require the `Setup NodeJS` action to be executed prior to the action.**

## Inputs

|Input|Required?|Default|Type|Description|
|--|--|--|--|--|
|`tests_folder`|optional|`.`|path| Folder where `npm test` will run (relative to project root)
|`compose_folder`|optional|`.`|path| `docker-compose.yml` folder (relative to project root)
|`run_compose`|optional||bool| Runs `docker-compose up` before testing
|`wait_for_url`|optional||url| App URL to wait before testing (runs `npm start` if `run_compose` not set)
|`pr_author_username`|required||string| Pull Request author username|

## Outputs

|Output|Description|
|--|--|
|`result`|Jest unit tests JSON results in base64 format|

## Usage example

This action gets together the access the docker on the host system (VM) and usage of Cypress on testing.

It is therefore possible to execute a docker command to create a container based on the student's project.

## How to get result output (v1)

```yml
- name: Fetch Docker Cypress evaluator
  uses: actions/checkout@v3
  with:
    repository: betrybe/docker-cypress-evaluator-action
    ref: v1.0.0
    token: ${{ secrets.GIT_HUB_PAT }}
    path: .github/actions/docker-cypress-evaluator

- name: Setup NodeJS
  uses: actions/setup-node@v3
  with:
    node-version: '16'

- name: Run Docker Cypress evaluation
  id: cypress_eval
  uses: ./.github/actions/docker-cypress-evaluator
  with:
    tests_folder: __tests__
    compose_folder: app
    run_compose: true
    wait_for_url: http://localhost:3000
    pr_author_username: ${{ github.event.inputs.pr_author_username }}

- name: Next step
  uses: another-github-action
  with:
    param: ${{ steps.evaluator.outputs.result }}
```

## Project requirements

The project that want to use this action should implement unit tests grouping them using `describe` statements.
Each `describe` statement will be mapped to a requirement.

Example:

```javascript
describe('requirement #1' () => {
  it('unit test1', () => {});
  it('unit test2', () => {});
  it('unit test3', () => {});
});

describe('requirement #2' () => {
  it('unit test1', () => {});
  it('unit test2', () => {});
  it('unit test3', () => {});
});

describe('requirement #3' () => {
  it('unit test1', () => {});
  it('unit test2', () => {});
  it('unit test3', () => {});
});
```

Project repository must create a file called `requirements.json` inside `.trybe` folder.

This file should have the following structure:

```json
{
  "requirements": [{
    "description": "requirement #1",
    "bonus": false
  }, {
    "description": "requirement #2",
    "bonus": true
  }, {
    "description": "requirement #3",
    "bonus": false
  }]
}
```

where the `"requirement #1"`, `"requirement #2"` and `"requirement #3"` are the requirements and describes names.

## Learn about GitHub Actions

- <https://help.github.com/en/actions/automating-your-workflow-with-github-actions/creating-a-docker-container-action>
