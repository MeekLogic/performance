/**
 * Trim array
 *
 * @export
 * @param {Array} data
 * @param {number} gate
 * @returns {Array}
 */
export default function(data, gate) {
  // Validate numbers
  if (typeof data !== 'object') {
    throw new TypeError('Parameter "data" must be of type array.');
  }

  if (data.length === 0) {
    throw new Error('Paramater "data" is an empty array.');
  }

  // Validate gate
  if (typeof gate !== 'number') {
    throw new TypeError('Parameter "gate" must be of type number.');
  }

  // Calculate trim
  const trim = data.length * gate;

  // Trim array
  return data.slice(trim - 1, (data.length - trim) - 1);
}
