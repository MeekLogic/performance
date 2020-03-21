import {performance} from 'perf_hooks';
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

    // Combine options with defaults
    this.options = Object.assign({
      rounds: 100000,
    }, options);

    this.results = {};
  }

  /**
   * Run performance test.
   *
   * @param {string} name Test Name.
   * @param {Function} method The function containing the testing procedure.
   * @param {object} options Test parameters.
   * @return {object} Test results.
   */
  test(name, method, options = {}) {
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
      results: this.calculateMetrics(roundTimes),
    };

    // Store results
    this.results[name] = data;

    return data;
  }

  /**
   * Calculate test metrics.
   *
   * @param {Array} roundTimes
   * @return {object}
   */
  calculateMetrics(roundTimes) {
    const data = {};

    // Calculate total time
    data.totalTime = roundTimes.reduce((a, b) => {
      return a + b;
    });

    // Calculate averages
    data.timePerRound = {
      mean: {
        normal: data.totalTime / roundTimes.length,
        trimmed: mean(roundTimes, 0.1),
      },
      median: median(roundTimes),
      modes: mode(roundTimes),
      range: range(roundTimes),
    };

    // Calculate standard deviation
    data.timePerRound.standardDeviation = Math.sqrt(roundTimes.reduce(function(sq, n) {
      return sq + Math.pow(n - data.timePerRound.mean.normal, 2);
    }, 0) / (roundTimes.length - 1)),

    // Calculate operations per second
    data.operationsPerSecond = {
      normal: 1000 / data.timePerRound.mean.normal,
      trimmed: 1000 / data.timePerRound.mean.trimmed,
    };

    return data;
  }
}
