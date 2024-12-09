import { loadFileToString, split } from '@utils'

type GuardOrientation = '^' | '>' | 'V' | '<'
type Grid = (string | GuardOrientation)[][]
type GuardPosition = {
  row: number
  col: number
  guard: GuardOrientation
}

const VISITED = 'X'
const OBSTACLE = '#'
const POSITIONS: GuardOrientation[] = ['^', '>', 'V', '<']

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const prettyPrint = (grid: Grid): void => {
  console.log(grid.map(row => row.join('')).join('\n'))
}

const getGuardPosition = (grid: Grid): GuardPosition => {
  const guardRow = grid.findIndex(row => row.some(cell => POSITIONS.includes(cell as GuardOrientation)))
  const guardCol = grid[guardRow].findIndex(cell => POSITIONS.includes(cell as GuardOrientation))
  const guard = grid[guardRow][guardCol]
  return { row: guardRow, col: guardCol, guard: guard as GuardOrientation }
}

export const nextMoveIsOffGrid = (grid: Grid): boolean => {
  const rows = grid.length
  const cols = grid[0].length
  const { guard, col: guardCol, row: guardRow } = getGuardPosition(grid)

  return (guard === POSITIONS[0] && guardRow === 0)
    || (guard === POSITIONS[1] && guardCol === cols - 1)
    || (guard === POSITIONS[2] && guardRow === rows - 1)
    || (guard === POSITIONS[3] && guardCol === 0)
}

const DIRECTIONS = {
  ['^']: [-1, 0],
  ['>']: [0, 1],
  ['V']: [1, 0],
  ['<']: [0, -1],

}
const getNextMove = (currentPosition: GuardPosition): GuardPosition => {
  const { guard, col, row } = currentPosition
  const [directionRow, directionCol] = DIRECTIONS[guard]
  return { guard, row: row + directionRow, col: col + directionCol }
}

const rotateGuard = (guardOrientation: GuardOrientation): GuardOrientation => {
  return POSITIONS[(POSITIONS.indexOf(guardOrientation) + 1) % POSITIONS.length]
}

export const updateGrid = (grid: Grid): Grid => {
  // Find guard
  const currentPosition = getGuardPosition(grid)

  // Simulate next move
  let nextPosition = getNextMove(currentPosition)

  if (grid[nextPosition.row][nextPosition.col] === OBSTACLE) {
    nextPosition = getNextMove({ ...currentPosition, guard: rotateGuard(currentPosition.guard) })
  }

  const gridCopy = structuredClone(grid)
  gridCopy[currentPosition.row][currentPosition.col] = VISITED
  gridCopy[nextPosition.row][nextPosition.col] = nextPosition.guard
  return gridCopy
}

export default (filePath: string) => {
  // Load grid
  let grid = loadFileToString(filePath).split('\n').map(split(''))

  // Until guard will go off screen
  while (!nextMoveIsOffGrid(grid)) {
    grid = updateGrid(grid)
  }

  // Return count of X
  return grid.flat().filter(space => space === VISITED).length + 1
}
