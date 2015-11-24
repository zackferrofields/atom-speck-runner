var test = require('tape');
var file = require('/Users/zack.ferrofields/Projects/atom-speck-runner/examples/sum.js');

test('sum function', function(t) {
  t.plan(2);
  t.deepEqual(3, file.sum(1,2), 'returns the sum of both parameters');
  t.deepEqual(1, file.sum(3,-1), 'works with negative numbers');
});
