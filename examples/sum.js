// test > sum function
// # sum(1 ,2) === 3 (returns the sum of both parameters)
// # sum(3, -1) === -2 (works with negative numbers)
function sum(a,b) {
  return a + b;
}

module.exports = {
  sum: sum,
  // test > add function
  // # add(1, 2) == 3 (returns the sum of both params)
  // # add(3, 4) == -7 (returns the sum of both params)
  add: function(a,b) {
    return a + b;
  }
};
