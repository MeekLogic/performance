/**
 * Generate file name timestamp.
 * Inspired from {@link https://gist.github.com/hurjas/2660489}
 *
 * @return {string} Return current date & time as `string`.
 */
export function timeStamp() {
  // Create a date object with the current time
  const now = new Date();

  // Create an array with the current month, day and time
  const date = [now.getMonth() + 1, now.getDate(), now.getFullYear()];

  // Create an array with the current hour, minute and second
  const time = [now.getHours(), now.getMinutes(), now.getSeconds()];

  // If seconds, minutes, or hours are less than 10, prefix with a zero
  for (let i = 0; i < 3; i++) {
    if (time[i] < 10) {
      time[i] = '0' + time[i];
    }
  }

  // Return the formatted string
  return date.join('-') + '_' + time.join('-');
}

/**
 *
 * {@link https://stackoverflow.com/questions/45309447/calculating-median-javascript}
 *
 * @param {Array} values
 * @return {number}
 */
export function median(values) {
  if (values.length ===0) return 0;

  values.sort(function(a, b) {
    return a-b;
  });

  const half = Math.floor(values.length / 2);

  if (values.length % 2) {
    return values[half];
  }

  return (values[half - 1] + values[half]) / 2.0;
}

/**
 * The "mode" is the number that is repeated most often.
 * See {@link https://jonlabelle.com/snippets/view/javascript/calculate-mean-median-mode-and-range-in-javascript}
 *
 * For example, the "mode" of [3, 5, 4, 4, 1, 1, 2, 3] is [1, 3, 4].
 *
 * @param {Array} numbers An array of numbers.
 * @return {Array} The mode of the specified numbers.
 */
export function mode(numbers) {
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
    if (count.hasOwnProperty(i)) {
      if (count[i] === maxIndex) {
        modes.push(Number(i));
      }
    }
  }

  return modes;
}

/**
 * The "range" of a list a numbers is the difference between the largest and
 * smallest values.
 * See {@link https://jonlabelle.com/snippets/view/javascript/calculate-mean-median-mode-and-range-in-javascript}
 *
 * For example, the "range" of [3, 5, 4, 4, 1, 1, 2, 3] is [1, 5].
 *
 * @param {Array} numbers An array of numbers.
 * @return {Array} The range of the specified numbers.
 */
export function range(numbers) {
  numbers.sort();
  return [numbers[0], numbers[numbers.length - 1]];
}
