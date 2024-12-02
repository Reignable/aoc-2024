import { describe, expect, it } from 'vitest'
import solution01 from './01'
import solution02 from './02'

describe('S01', () => {
  it('Calculates the total distance between two lists of numbers', () => {
    expect(solution01('days/01/data/test.txt')).toBe(11)
  })
})

describe('S02', () => {
  it('Calculates the similarity score for both lists', () => {
    expect(solution02('days/01/data/test.txt')).toBe(31)
  })
})
