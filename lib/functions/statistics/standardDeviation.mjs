import mean from './mean.mjs';

/**
 * Standard deviation
 * See {@link https://dustinpfister.github.io/2018/02/20/statistics-standard-deviation/}
 *
 * @param {Array} numbers
 * @return {number}
 */
export default function(numbers) {
  // Validate numbers
  if (typeof numbers !== 'object') {
    throw new TypeError('Parameter "numbers" must be of type array.');
  }

  if (numbers.length === 0) {
    throw new Error('Paramater "numbers" is an empty array.');
  }

  const m = mean(numbers);

  return Math.sqrt(numbers.reduce(function(sq, n) {
    return sq + Math.pow(n - m, 2);
  }, 0) / (numbers.length - 1));
};
