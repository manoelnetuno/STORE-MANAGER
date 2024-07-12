const { defineConfig } = require('cypress');

const dbUtils = require('./cypress/utils/db');
const mochaUtils = require('./cypress/utils/mocha');

module.exports = defineConfig({
  video: false,
  screenshotOnRunFailure: false,
  defaultCommandTimeout: 0,
  e2e: {
    async setupNodeEvents(on, config) {
      on('task', { ...dbUtils, ...mochaUtils });
      return config;
    },
    specPattern: ['**/*.cy.js'],
    excludeSpecPattern: process.env.CY_CLI ? ['**/00.RunAllSpecs.cy.js'] : [],
    reporter: process.env.CY_MULTI_REPORTER ? 'cypress-multi-reporters' : undefined,
    reporterOptions: process.env.CY_MULTI_REPORTER ? {
      configFile: 'reporter.json',
    } : undefined,
  },
});
