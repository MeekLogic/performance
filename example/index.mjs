import Performance from '../lib/performance.mjs';

const performance = new Performance();

performance.test('let', () => {
  // eslint-disable-next-line no-unused-vars, prefer-const
  let testLet = 100000;
});

performance.test('var', () => {
  // eslint-disable-next-line no-var, no-unused-vars
  var testVar = 100000;
});

performance.test('const', () => {
  // eslint-disable-next-line no-unused-vars
  const testCon = 100000;
});

performance.output();

performance.save('./example/performance.json');
