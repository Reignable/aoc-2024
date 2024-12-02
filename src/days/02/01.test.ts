import { getTestFilePath } from '@utils'
import { describe, expect, it } from 'vitest'
import solution, { pairIsUnsafe } from './01'

it('Should count safe reports', () => {
  expect(solution(getTestFilePath('02'))).toBe(2)
})

describe('pairIsUnsafe', () => {
  it.each`
    difference | direction | expected
    ${0} | ${'INC'} | ${true}
    ${0} | ${'DEC'} | ${true}
    ${4} | ${'INC'} | ${true}
    ${-4} | ${'DEC'} | ${true}
    ${2} | ${'INC'} | ${true}
    ${-2} | ${'DEC'} | ${true}
    ${-2} | ${'INC'} | ${false}
    ${2} | ${'DEC'} | ${false}
  `('', ({ difference, direction, expected }) => {
    expect(pairIsUnsafe(direction, difference)).toBe(expected)
  })
})
