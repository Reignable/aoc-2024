import { sumArray } from '@utils'

const sumMiddles = (updates: string[][]): number => {
  const middles = updates.map(update => update[Math.floor(update.length / 2)]).map(Number)
  return sumArray(middles)
}

export { sumMiddles }
