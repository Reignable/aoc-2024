import { describe, expect, it } from 'vitest'
import solution from './01'

describe('D01/S01', () => {
  it('Calculates the total distance between two lists of numbers', () => {
    expect(solution('days/01/data/test.txt')).toBe(11)
  })
})
