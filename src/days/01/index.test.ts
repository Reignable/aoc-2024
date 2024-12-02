import { describe, expect, it } from 'vitest'
import solution from './index'

describe('Day 01', () => {
  it('Calculates the total distance between two lists of numbers', () => {
    expect(solution('days/01/data/test.txt')).toBe(11)
  })
})
