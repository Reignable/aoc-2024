import { getTestFilePath } from '@utils'
import { describe, expect, it } from 'vitest'
import { s01 } from '.'

describe('01', () => {
  it('Calculates the product of valid multiplication instructions', () => {
    expect(s01(getTestFilePath('03'))).toBe(161)
  })
})
