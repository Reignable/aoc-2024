import { loadFileRows, sumArray } from '@utils'
import { createLeftRightNumberLists } from './createLeftRightNumberLists'

/*
File format
number number
number number
number number
...
*/

const solution = (filePath: string) => {
  const rows = loadFileRows(filePath)

  // Get two lists of numbers from string rows
  const [left, right] = createLeftRightNumberLists(rows)

  // Sort lists small to large
  const sortedLeft = left.toSorted()
  const sortedRight = right.toSorted()

  // Get pairs
  const pairs = sortedLeft.map((value, index) => [value, sortedRight[index]])

  // Find distance for pair
  const distances = pairs.map(([left, right]) => (Math.abs(left - right)))

  // Sum
  return sumArray(distances)
}

export default solution
