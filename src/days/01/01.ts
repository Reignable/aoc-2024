import { loadFileToString } from '@utils'

/*
File format
number number
number number
number number
...
*/

const solution = (filePath: string) => {
  const text = loadFileToString(filePath)
  const rows = text.split('\n')

  // Get two lists of numbers from string rows
  const [left, right] = rows.reduce<[left: number[], right: number[]]>(([l, r], cur) => {
    const [leftValue, rightValue] = cur.split(' ').filter(Boolean).map(Number)
    return [[...l, leftValue], [...r, rightValue]] as [number[], number[]]
  }, [[], []])

  // Sort lists small to large
  const sortedLeft = left.toSorted()
  const sortedRight = right.toSorted()

  // Get pairs
  const pairs = sortedLeft.map((value, index) => [value, sortedRight[index]])

  // Find distance for pair
  const distances = pairs.map(([left, right]) => (Math.abs(left - right)))

  // Sum
  const sum = distances.reduce((sum, val) => sum + val)

  return sum
}

export default solution
