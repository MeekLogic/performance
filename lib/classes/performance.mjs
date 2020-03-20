import fs from 'fs';
import {performance} from 'perf_hooks';
import {median, mode, range, timeStamp} from '../utils/index.mjs';

/**
 * Performance Testing Library
 */
export default class {
  /**
   * Setup logging
   */
  constructor() {
    this.saveFile = './performance/data/' + timeStamp() + '.json';

    this.testResults = {};
  }

  /**
   * Run performance test.
   *
   * @param {Function} testMethod The function containing the testing procedure.
   * @param {object} options Test parameters.
   * @return {object} Test results.
   */
  runTest(testMethod, options = {}) {
    // Validate testMethod
    if (typeof testMethod !== 'function') {
      throw new TypeError('Parameter "testMethod" must be of type function.');
    }

    // Validate options
    if (typeof options !== 'object') {
      throw new TypeError('Paramater "options" must be of type object.');
    }

    // Combine defaults
    options = Object.assign({
      rounds: 1000,
    }, options);

    const roundTimes = [];

    // Run test for as many rounds as specified
    for (let i = options.rounds; i > 0; i--) {
      // Record start time
      const roundStartTime = performance.now();

      // Run user supplied method
      // Wrapped in Promise.resolve() for async compatability
      Promise.resolve(testMethod());

      // Record stop time
      const roundStopTime = performance.now();

      // Calculate and add round time
      roundTimes.push(roundStopTime - roundStartTime);
    }

    const data = {
      options: options,
      results: {},
    };

    // Calculate total time
    data.results.totalTime = roundTimes.reduce((a, b) => {
      return a + b;
    });

    // Calculate averages
    data.results.timePerRound = {
      mean: data.results.totalTime / options.rounds,
      median: median(roundTimes),
      modes: mode(roundTimes),
      range: range(roundTimes),
    };

    // Calculate operations per second
    data.results.operationsPerSecond = 1000 / data.results.timePerRound.median;

    return data;
  }

  /**
   *
   * @param {string} name
   * @param {object} data
   */
  storeResults(name, data) {
    // Validate name
    if (typeof name !== 'string') {
      throw new TypeError('Parameter "name" must be of type string.');
    }

    // Validate data
    if (typeof data !== 'object') {
      throw new TypeError('Paramter "data" must be of type object');
    }

    // Store data
    this.testResults[name] = data;
  }

  /**
   *
   * @param {string} name
   * @param {object} data
   */
  outputResults(name, data) {
    // Validate name
    if (typeof name !== 'string') {
      throw new TypeError('Parameter "name" must be of type string.');
    }

    // Validate data
    if (typeof data !== 'object') {
      throw new TypeError('Paramter "data" must be of type object');
    }

    console.log(data);

    // Basic pretty formatting
    let output = Math.round(data.results.operationsPerSecond).toLocaleString();

    // Add spaces to the front if less than 6 characters
    for (let i = 6 - output.length; i > 0; i--) {
      output = ' ' + output;
    }

    console.log(`${output} op/s | ${name}`);
  }

  /**
   * Save results in JSON asynchronously to a file.
   */
  saveResults() {
    fs.writeFile(this.saveFile, JSON.stringify(this.testResults, null, 2), (err) => {
      if (err) {
        console.error(err);
        throw err;
      }

      console.info(`Saved to: ${this.saveFile}`);
    });
  }
}
