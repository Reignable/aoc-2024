import { getTestFilePath } from '@utils'
import { describe, expect, it } from 'vitest'
import { s01, s02 } from '.'

describe('01', () => {
  it('Calculates the product of valid multiplication instructions', () => {
    expect(s01(getTestFilePath('03'))).toBe(161)
  })
})

describe('02', () => {
  it('Calculates the product of valid multiplication instructions between do() and don\'t() commands', () => {
    expect(s02('days/03/data/test02.txt')).toBe(48)
  })
})
