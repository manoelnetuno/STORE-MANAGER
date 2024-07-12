const { requirements } = require('../../../.trybe/requirements.json');

/**
 * Returns description for a given requirement number
 * @param {number} number requirement number starting at 1
 * @returns {string} requirement description
 */
const getRequirementDescription = (number) => requirements[number - 1].description;

module.exports = { getRequirementDescription };
