import { getTestFilePath } from '@utils'
import { describe, expect, it } from 'vitest'
import { s01, s02 } from '.'
import { comparePage } from './02'

const testFilePath = getTestFilePath('05')

describe('01', () => {
  it('Calculates the sum of middle values in valid updates', () => {
    expect(s01(testFilePath)).toBe(143)
  })
})

describe('02', () => {
  it('Calculates the sum of middle values in invalid updates after they\'ve been sorted', () => {
    expect(s02(testFilePath)).toBe(123)
  })
})

describe('comparePage', () => {
  it('Returns 0 if a has no rules', () => {
    expect(comparePage([['3', '2'], ['2', '4']])('1', '2')).toBe(0)
  })

  it('Returns 0 if b has no rules', () => {
    expect(comparePage([['3', '5'], ['1', '4']])('1', '2')).toBe(0)
  })

  it('Returns -1 if a should be before b', () => {
    expect(comparePage([['29', '13']])('29', '13')).toBe(-1)
  })
})
