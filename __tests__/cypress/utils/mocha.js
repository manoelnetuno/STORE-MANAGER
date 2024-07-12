const fs = require('fs').promises;
const path = require('path');

const { commands, messages, errors } = require('./index.json');
const { runCommand, cacheWrapper } = require('./exec');

const COVERAGE_SUMMARY = path.join(__dirname, '../../../backend/coverage/coverage-summary.json');
const MUTATION_REPORT = path.join(__dirname, '../../../backend/reports/mutation/mutation.json');

const runCoverageTests = async () => {
  if (process.env.DEBUG) console.log('Rodando testes de cobertura...');
  await runCommand({ command: commands.RUN_COVERAGE_TESTS });
  const { stderr, stdout, status } = await runCommand({ command: commands.RUN_COVERAGE_TESTS });
  if ((stderr + stdout).includes(errors.MOCHA_NO_TEST)) {
    throw new Error(messages.MOCHA_NO_TESTS_ERROR);
  }
  if (status !== 0) {
    throw new Error(messages.MOCHA_FAIL_TESTS_ERROR);
  }
  if (process.env.DEBUG) console.log('Testes de cobertura finalizados!');
  return true;
};

const readCoverageData = async () => {
  const coverageSummary = await fs.readFile(COVERAGE_SUMMARY, 'utf-8');
  return JSON.parse(coverageSummary);
};

const runMutationTests = async () => {
  if (process.env.DEBUG) console.log('Rodando testes de mutação...');
  const { stderr, stdout, status } = await runCommand({ command: commands.RUN_MUTATION_TESTS });
  if ((stderr + stdout).includes(errors.STRYKER_NO_TEST)) {
    throw new Error(messages.MOCHA_NO_TESTS_ERROR);
  }
  if (status !== 0) {
    throw new Error(messages.MOCHA_FAIL_TESTS_ERROR);
  }
  if (process.env.DEBUG) console.log('Testes de mutação finalizados!');
  return true;
};

const readMutationData = async () => {
  const mutationReport = JSON.parse(
    await fs.readFile(MUTATION_REPORT, 'utf-8'),
  );
  const mutants = Object.values(mutationReport.files)
    .map((file) => file.mutants)
    .flat();
  const summary = {
    total: mutants.length,
    killed: mutants.filter(({ status }) => status === 'Killed').length,
    survived: mutants.filter(({ status }) => ['NoCoverage', 'Survived'].includes(status)).length,
  };
  return {
    ...summary,
    pct: Number(((summary.killed / (summary.killed + summary.survived)) * 100).toFixed(2)),
  };
};

const runMochaTests = async ({ spec, force = false }) => {
  const shouldRun = (process.env.REQ || force)
    || (!process.env.CY_CLI && spec !== '00.RunAllSpecs.cy.js');
  
  if (shouldRun) {
    await runCoverageTests();
    await runMutationTests();
  }
  return true;
};

module.exports = {
  readCoverageData: cacheWrapper(readCoverageData),
  readMutationData: cacheWrapper(readMutationData),
  runMochaTests,
};
