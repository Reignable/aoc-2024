import { describe, expect, it } from 'vitest'
import solution from './02'

describe('D01/S02', () => {
  it('Calculates the similarity score for both lists', () => {
    expect(solution('days/01/data/test.txt')).toBe(31)
  })
})
