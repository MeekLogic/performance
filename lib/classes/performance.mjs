import fs from 'fs';
import {performance} from 'perf_hooks';
import timeStamp from '../functions/files/timeStamp.mjs';
import mean from '../functions/statistics/mean.mjs';
import median from '../functions/statistics/median.mjs';
import mode from '../functions/statistics/mode.mjs';
import range from '../functions/statistics/range.mjs';

/**
 * Performance Testing Library
 */
export default class {
  /**
   * Setup logging
   *
   * @param {object} options
   */
  constructor(options = {}) {
    // Validate options
    if (typeof options !== 'object') {
      throw new TypeError('Paramater "options" must be of type object.');
    }

    // Combine defaults
    this.options = Object.assign({
      rounds: 100000,
      saveFile: './performance/data/' + timeStamp() + '.json',
    }, options);

    this.testResults = {};
  }

  /**
   * Run performance test.
   *
   * @param {Function} method The function containing the testing procedure.
   * @param {object} options Test parameters.
   * @return {object} Test results.
   */
  runTest(method, options = {}) {
    // Validate testMethod
    if (typeof method !== 'function') {
      throw new TypeError('Parameter "method" must be of type function.');
    }

    // Validate options
    if (typeof options !== 'object') {
      throw new TypeError('Paramater "options" must be of type object.');
    }

    // Combine defaults
    options = Object.assign({
      rounds: this.options.rounds,
    }, options);

    const roundTimes = [];

    // Run test for as many rounds as specified
    for (let i = options.rounds; i > 0; i--) {
      // Record start time
      const roundStartTime = performance.now();

      // Run user supplied method
      // Wrapped in Promise.resolve() for async compatability
      Promise.resolve(method());

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
      mean: {
        normal: data.results.totalTime / options.rounds,
        trimmed: mean(roundTimes, 0.1),
      },
      median: median(roundTimes),
      modes: mode(roundTimes),
      range: range(roundTimes),
    };

    // Calculate standard deviation
    data.results.timePerRound.standardDeviation = Math.sqrt(roundTimes.reduce(function(sq, n) {
      return sq + Math.pow(n - data.results.timePerRound.mean.normal, 2);
    }, 0) / (roundTimes.length - 1)),

    // Calculate operations per second
    data.results.operationsPerSecond = {
      normal: 1000 / data.results.timePerRound.mean.normal,
      trimmed: 1000 / data.results.timePerRound.mean.trimmed,
    };

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

    // Basic pretty formatting
    let output = Math.round(data.results.operationsPerSecond.trimmed).toLocaleString();

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
    fs.writeFile(this.options.saveFile, JSON.stringify(this.testResults, null, 2), (err) => {
      if (err) {
        console.error(err);
        throw err;
      }

      console.info(`Saved to: ${this.saveFile}`);
    });
  }
}
