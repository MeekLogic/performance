/**
 * The "range" of a list a numbers is the difference between the largest and
 * smallest values.
 * See {@link https://jonlabelle.com/snippets/view/javascript/calculate-mean-median-mode-and-range-in-javascript}
 *
 * For example, the "range" of [3, 5, 4, 4, 1, 1, 2, 3] is [1, 5].
 *
 * @param {Array} numbers An array of numbers.
 * @returns {Array} The range of the specified numbers.
 */
export default function(numbers) {
  // Validate numbers
  if (typeof numbers !== 'object') {
    throw new TypeError('Parameter "numbers" must be of type array.');
  }

  if (numbers.length === 0) {
    throw new Error('Paramater "numbers" is an empty array.');
  }

  numbers.sort();

  return [numbers[0], numbers[numbers.length - 1]];
}
