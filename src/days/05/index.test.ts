import { describe, expect, it } from 'vitest'
import { s01, s02 } from '.'
import { getTestFilePath } from '@utils'

describe('01', () => {
  it('Calculates the sum of middle values in valid updates', () => {
    expect(s01(getTestFilePath('05'))).toBe(143)
  })
})

describe('02', () => {
  it.todo('passes')
})
