/* eslint-disable import/no-unresolved */
/* eslint-disable node/no-missing-import */
import test from 'ava';
import Performance from '../lib/performance.mjs';

test('Invalid parameters', (t) => {
  t.throws(() => {
    Performance.test(() => {
      return 'no name';
    });
  }, {instanceOf: TypeError});
});
