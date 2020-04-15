import mean from '../functions/statistics/mean.mjs';
import median from '../functions/statistics/median.mjs';
import mode from '../functions/statistics/mode.mjs';
import range from '../functions/statistics/range.mjs';

/**
 * Calculate test metrics.
 *
 * @param {Array} roundTimes
 * @returns {object}
 */
export default function(roundTimes) {
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
