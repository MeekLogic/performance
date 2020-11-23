import trimArray from '../arrays/trim.mjs';

/**
 *
 * @param {Array} numbers An array of numbers.
 * @param {number} [gate] Limit array length after sorting.
 * @returns {number} The range of the specified numbers.
 */
export default function(numbers, gate = 0) {
  // Validate numbers
  if (!Array.isArray(numbers)) {
    throw new TypeError('Parameter "numbers" must be of type array.');
  }

  if (numbers.length === 0) {
    throw new Error('Paramater "numbers" is an empty array.');
  }

  // Should we trim array?
  if (gate) {
    // Validate gate
    if (typeof gate !== 'number') {
      throw new TypeError('Parameter "gate" must be of type number.');
    }

    // We must sort the dataset
    numbers.sort();

    // Trim array
    numbers = trimArray(numbers, gate);
  }

  // Calculate and return mean
  return numbers.reduce((a, b) => {
    return a + b;
  }) / numbers.length;
}
