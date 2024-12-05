import { getTestFilePath } from '@utils'
import { describe, expect, it } from 'vitest'
import { s01, s02 } from '.'

describe('01', () => {
  it('Counts XMAS in a word search', () => {
    expect(s01(getTestFilePath('04'))).toBe(18)
  })
})

describe('02', () => {
  it('Counts MAS in the shape of an x', () => {
    expect(s02(getTestFilePath('04'))).toBe(9)
  })
})
