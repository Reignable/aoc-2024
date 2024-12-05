import { loadFileRows } from '@utils'

const countOccurrence = (grid: string[][], word: string) => {
  const rows = grid.length
  const cols = grid[0].length
  const wordLength = word.length
  const directions: [number, number][] = [[0, 1], [1, 0], [1, 1], [1, -1], [0, -1], [-1, 0], [-1, -1], [-1, 1]]
  let occurrenceCount = 0

  const isValidPosition = (x: number, y: number) => x >= 0 && x < rows && y >= 0 && y < cols

  const searchFrom = (x: number, y: number, direction: [number, number]) => {
    let newX: number
    let newY: number
    for (let i = 0; i < wordLength; ++i) {
      newX = x + i * direction[0]
      newY = y + i * direction[1]

      if (!isValidPosition(newX, newY) || grid[newX][newY] !== word[i]) return false
    }
    return true
  }

  for (let x = 0; x < rows; ++x) {
    for (let y = 0; y < cols; ++y) {
      if (grid[x][y] === word[0]) {
        for (const direction of directions) {
          if (searchFrom(x, y, direction)) occurrenceCount += 1
        }
      }
    }
  }
  return occurrenceCount
}

export default (filePath: string) => {
  const rows = loadFileRows(filePath)
  const cells = rows.map(row => row.split(''))
  return countOccurrence(cells, 'XMAS')
}
