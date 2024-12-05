import { getTestFilePath } from '@utils'
import { describe, expect, it } from 'vitest'
import { s01 } from '.'

describe('01', () => {
  it('Counts XMAS in a word search', () => {
    expect(s01(getTestFilePath('04'))).toBe(18)
  })
})
