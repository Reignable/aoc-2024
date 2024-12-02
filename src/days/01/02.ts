import { loadFileRows, sumArray } from '@utils'
import { createLeftRightNumberLists } from './createLeftRightNumberLists'

const solution = (filePath: string) => {
  const rows = loadFileRows(filePath)
  const [left, right] = createLeftRightNumberLists(rows)

  const rightCounts = new Map<number, number>()
  right.forEach((value) => {
    rightCounts.set(value, (rightCounts.get(value) ?? 0) + 1)
  })

  // Multiply each left number by its right occurrence
  const multipliers = left.map(
    value => value * (rightCounts.get(value) ?? 0),
  )

  // Sum
  return sumArray(multipliers)
}

export default solution
