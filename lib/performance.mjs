import Performance from './classes/performance.mjs';

const performance = new Performance();

/**
 * Run performance test.
 *
 * @param {string} name The name of test.
 * @param {Function} testMethod The function containing the testing procedure.
 * @param {object} options Test paramaters.
 */
export function test(name, testMethod, options = {}) {
  // Run test and get results
  const data = performance.runTest(testMethod, options);

  // Store results
  performance.storeResults(name, data);

  // Output results to console
  performance.outputResults(name, data);
}

/**
 * Save results to JSON file.
 */
export function save() {
  performance.saveResults();
}
