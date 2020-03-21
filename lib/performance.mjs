import Performance from './classes/performance.mjs';
import fs from 'fs';

const performance = new Performance();

/**
 * Run performance test.
 *
 * @param {string} name The name of test.
 * @param {Function} method The function containing the testing procedure.
 * @param {object} options Test paramaters.
 */
export function test(name, method, options = {}) {
  // Run test and get results
  performance.test(name, method, options);
}

/**
 * Get results of finished tests.
 *
 * @return {object}
 */
export function getResults() {
  return performance.results;
}

/**
 * Output results to console.
 */
export function output() {
  let maxLength = 0;

  Object.keys(performance.results).forEach((testName) => {
    const outputLength = Math.round(performance.results[testName].results.operationsPerSecond.trimmed).toLocaleString().length;

    if (outputLength > maxLength) {
      maxLength = outputLength;
    }
  });

  Object.keys(performance.results).forEach((testName) => {
    // Basic pretty formatting
    let output = Math.round(performance.results[testName].results.operationsPerSecond.trimmed).toLocaleString();

    // Add spaces to the front if less than 6 characters
    for (let i = maxLength - output.length; i > 0; i--) {
      output = ' ' + output;
    }

    console.log(`${output} op/s | ${testName}`);
  });
}

/**
 * Save results to JSON file.
 *
 * @param {string} file
 */
export function save(file) {
  fs.writeFile(file, JSON.stringify(performance.results, null, 2), (err) => {
    if (err) {
      console.error(err);
      throw err;
    }

    console.info(`Saved to: ${file}`);
  });
}
