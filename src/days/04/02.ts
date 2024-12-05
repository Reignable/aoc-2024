import { loadFileRows } from '@utils'
type Grid = string[][]

const getRowsAndCols = (grid: Grid): { rows: number, cols: number } =>
  ({ rows: grid.length, cols: grid[0].length })

const getValueAtPosition = (grid: Grid, x: number, y: number) => grid[x][y]

const isValidPosition = (grid: Grid, x: number, y: number) => {
  const { rows, cols } = getRowsAndCols(grid)
  return x >= 0
    && x < rows
    && y >= 0
    && y < cols
}

const isValidValue = (value: string): boolean => ['M', 'S'].includes(value)

const validatePosition = (...args: [Grid, number, number]) =>
  isValidPosition(...args)
  && isValidValue(getValueAtPosition(...args))

const isMasInXShape = (grid: Grid, x: number, y: number): boolean => {
  const directions: [number, number][] = [
    [x - 1, y - 1], // ↖️
    [x + 1, y - 1], // ↗️
    [x - 1, y + 1], // ↙️
    [x + 1, y + 1], // ↘️
  ]

  const positionValidities = directions.map(dir => validatePosition(grid, ...dir))

  if (!positionValidities.every(Boolean)) return false

  const [topLeft, topRight, bottomLeft, bottomRight] = directions.map(dir => getValueAtPosition(grid, ...dir))

  const topsAndBottoms = topLeft === topRight
    && bottomLeft === bottomRight
    && topLeft !== bottomLeft
    && topRight !== bottomRight
  const leftsAndRights = topLeft === bottomLeft
    && topRight === bottomRight
    && topLeft !== topRight
    && bottomLeft !== bottomRight
  return topsAndBottoms || leftsAndRights
}

const countOccurrence = (grid: Grid) => {
  const { rows, cols } = getRowsAndCols(grid)
  let occurrenceCount = 0

  for (let x = 0; x < rows; ++x) {
    for (let y = 0; y < cols; ++y) {
      if (grid[x][y] === 'A') {
        if (isMasInXShape(grid, x, y)) occurrenceCount += 1
      }
    }
  }
  return occurrenceCount
}

export default (filePath: string) => {
  const rows = loadFileRows(filePath)
  const grid = rows.map(row => row.split(''))
  return countOccurrence(grid)
}
