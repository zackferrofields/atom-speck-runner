// test > sum function
// # sum(1,2) === 3 (returns the sum of both parameters)
// # sum(3,-1) === 2 (works with negative numbers)
function sum(a,b) {
  return a + b;
}

module.exports = {
  sum: sum,
  // test > subtract function
  // # subtract(2,1) == 1 (subtracts the first param from the second)
  // # subtract(3,4) == -1 (works with negative numbers)
  subtract: function(a,b) {
    return a - b;
  }
};
