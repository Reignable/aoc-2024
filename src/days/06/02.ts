import { loadFileToString, split } from '@utils'

const DIRECTIONS: Record<string, [number, number]> = {
  ['^']: [-1, 0],
  ['>']: [0, 1],
  ['V']: [1, 0],
  ['<']: [0, -1],
}
const ORIENTATIONS = ['^', '>', 'V', '<']

const getGuardPosition = (grid: string[][]): { row: number, col: number, guard: string } => {
  const row = grid.findIndex(row => row.some(cell => ORIENTATIONS.includes(cell)))
  const col = grid[row].findIndex(cell => ORIENTATIONS.includes(cell))
  const guard = grid[row][col]
  return { row, col, guard }
}

const turnRight = (guard: string): string =>
  ORIENTATIONS[(ORIENTATIONS.indexOf(guard) + 1) % ORIENTATIONS.length]

const findLoopPositions = (grid: string[][]): number => {
  const [rows, cols] = [grid.length, grid[0].length]
  const guardStart = getGuardPosition(grid)

  const simulate = (grid: string[][]): boolean => {
    const visitedStates = new Set<string>()
    const guardPosition = { ...guardStart } // Clone the starting position

    while (true) {
      // Track the guard's current state (row, col, and direction)
      const state = `${guardPosition.row},${guardPosition.col},${guardPosition.guard}`

      // Check if we've visited this state before (loop detected)
      if (visitedStates.has(state)) {
        return true // Loop confirmed
      }

      visitedStates.add(state) // Mark this state as visited

      // Calculate the next position based on the guard's direction
      const [rowDirection, colDirection] = DIRECTIONS[guardPosition.guard]
      const newRow = guardPosition.row + rowDirection
      const newCol = guardPosition.col + colDirection

      // Check if the guard would exit the map
      if (newRow < 0 || newRow >= rows || newCol < 0 || newCol >= cols) {
        return false // No loop because the guard left the map
      }

      // Move forward if the path is clear
      if (grid[newRow][newCol] !== '#') {
        guardPosition.row = newRow
        guardPosition.col = newCol
      }
      else {
        // Turn right if there's an obstacle
        guardPosition.guard = turnRight(guardPosition.guard)
      }
    }
  }

  let validPositions = 0
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (grid[r][c] === '.' && !(r === guardStart.row && c === guardStart.col)) {
        const gridCopy = structuredClone(grid)
        gridCopy[r][c] = '#'

        const result = simulate(gridCopy)

        if (result) validPositions += 1
      }
    }
  }
  return validPositions
}

export default (filePath: string) => {
  const grid = loadFileToString(filePath).split('\n').map(split(''))
  return findLoopPositions(grid)
}
