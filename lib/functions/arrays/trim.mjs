/**
 * Trim array
 *
 * @param {Array} data Array to trim.
 * @param {number} gate Number of items to limit array to.
 * @returns {Array} Resulting limited array.
 */
export default function(data, gate) {
  // Validate numbers
  if (!Array.isArray(data)) {
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
