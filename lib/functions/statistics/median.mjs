/**
 *
 * {@link https://stackoverflow.com/questions/45309447/calculating-median-javascript}
 *
 * @param {Array} numbers
 * @returns {number}
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

  const half = Math.floor(numbers.length / 2);

  if (numbers.length % 2) {
    return numbers[half];
  }

  return (numbers[half - 1] + numbers[half]) / 2.0;
}
