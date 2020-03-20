import test from 'ava';
import {test as perf} from '../lib/performance.mjs';

test('Invalid parameters', (t) => {
  t.throws(() => {
    perf(() => {
      return 'no name';
    });
  }, {instanceOf: TypeError});
});
