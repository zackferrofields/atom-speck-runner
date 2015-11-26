module.exports = {
  // test > total function
  // # total([1, 2]) == 3 (returns the sum of array)
  // # total([3, 4, -5]) == 2 (works with negative numbers)
  // # total([]) == 0 (works with an empty array)
  // # total() == 0 (works with no arguments)
  total: function(x) {
    return (x || []).reduce(function(x, y) { return x + y; }, 0);
  }
}
