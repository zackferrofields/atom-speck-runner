/**
  total :: Num a => [a] -> a
  @method `total`
  @param {array} x
  @returns {Int}
  test > total function
  # total([1, 2]) == 3 (returns the sum of array)
  # total([3, 4, -5]) == 2 (works with negative numbers)
  # total([]) == 0 (works with an empty array)
  # total() == 0 (works with no arguments)
*/
export function total(x = []) {
  return x.reduce((x, y) =>  x + y, 0);
}
