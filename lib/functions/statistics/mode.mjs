/**
 * The "mode" is the number that is repeated most often.
 * See {@link https://jonlabelle.com/snippets/view/javascript/calculate-mean-median-mode-and-range-in-javascript}
 *
 * For example, the "mode" of [3, 5, 4, 4, 1, 1, 2, 3] is [1, 3, 4].
 *
 * @param {Array} numbers An array of numbers.
 * @returns {Array} The mode of the specified numbers.
 */
export default function(numbers) {
  // Validate numbers
  if (typeof numbers !== 'object') {
    throw new TypeError('Parameter "numbers" must be of type array.');
  }

  if (numbers.length === 0) {
    throw new Error('Paramater "numbers" is an empty array.');
  }

  // as result can be bimodal or multi-modal,
  // the returned result is provided as an array
  // mode of [3, 5, 4, 4, 1, 1, 2, 3] = [1, 3, 4]
  const modes = [];
  const count = [];
  let i;
  let number;
  let maxIndex = 0;

  for (i = 0; i < numbers.length; i += 1) {
    number = numbers[i];
    count[number] = (count[number] || 0) + 1;
    if (count[number] > maxIndex) {
      maxIndex = count[number];
    }
  }

  for (i in count) {
    if (Object.prototype.hasOwnProperty.call(count, i)) {
      if (count[i] === maxIndex) {
        modes.push(Number(i));
      }
    }
  }

  return modes;
}
