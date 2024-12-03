import { getTestFilePath } from '@utils'
import { describe, expect, it } from 'vitest'
import solution01 from './01'
import solution02 from './02'
import { getReportSafety, pairIsUnsafe } from './countSafeReports'

describe('S01', () => {
  it('Should count safe reports', () => {
    expect(solution01(getTestFilePath('02'))).toBe(2)
  })
})

describe('S02', () => {
  it('Should count safe reports with the problem dampener applied', () => {
    expect(solution02(getTestFilePath('02'))).toBe(4)
  })
})

describe('getReportSafety', () => {
  it.each([
    { report: [7, 6, 4, 2, 1], expected: 'SAFE', useProblemDampener: false },
    { report: [1, 2, 7, 8, 9], expected: 'UNSAFE', useProblemDampener: false },
    { report: [9, 7, 6, 2, 1], expected: 'UNSAFE', useProblemDampener: false },
    { report: [1, 3, 2, 4, 5], expected: 'UNSAFE', useProblemDampener: false },
    { report: [8, 6, 4, 4, 1], expected: 'UNSAFE', useProblemDampener: false },
    { report: [1, 3, 6, 7, 9], expected: 'SAFE', useProblemDampener: false },
    { report: [7, 6, 4, 2, 1], expected: 'SAFE', useProblemDampener: true },
    { report: [1, 2, 7, 8, 9], expected: 'UNSAFE', useProblemDampener: true },
    { report: [9, 7, 6, 2, 1], expected: 'UNSAFE', useProblemDampener: true },
    { report: [1, 3, 2, 4, 5], expected: 'SAFE', useProblemDampener: true },
    { report: [8, 6, 4, 4, 1], expected: 'SAFE', useProblemDampener: true },
    { report: [1, 3, 6, 7, 9], expected: 'SAFE', useProblemDampener: true },
    { report: [1, 1, 2, 3, 4, 5], expected: 'SAFE', useProblemDampener: true },
    { report: [5, 1, 2, 3, 4, 5], expected: 'SAFE', useProblemDampener: true },
    { report: [1, 4, 3, 2, 1], expected: 'SAFE', useProblemDampener: true },
    { report: [1, 6, 7, 8, 9], expected: 'SAFE', useProblemDampener: true },
    { report: [7, 6, 4, 2, 1], expected: 'SAFE', useProblemDampener: true },
    { report: [1, 2, 7, 8, 9], expected: 'UNSAFE', useProblemDampener: true },
    { report: [9, 7, 6, 2, 1], expected: 'UNSAFE', useProblemDampener: true },
    { report: [1, 3, 2, 4, 5], expected: 'SAFE', useProblemDampener: true },
    { report: [8, 6, 4, 4, 1], expected: 'SAFE', useProblemDampener: true },
    { report: [1, 3, 6, 7, 9], expected: 'SAFE', useProblemDampener: true },
    { report: [48, 46, 47, 49, 51, 54, 56], expected: 'SAFE', useProblemDampener: true },
    { report: [1, 2, 3, 4, 5, 5], expected: 'SAFE', useProblemDampener: true },
    { report: [1, 2, 3, 4, 3], expected: 'SAFE', useProblemDampener: true },
    { report: [9, 8, 7, 6, 7], expected: 'SAFE', useProblemDampener: true },
  ])('$report $useProblemDampener: $expected', ({ expected, report, useProblemDampener }) => {
    expect(getReportSafety(useProblemDampener)(report)).toBe(expected)
  })
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
  `('$direction, $difference', ({ difference, direction, expected }) => {
    expect(pairIsUnsafe(direction, difference)).toBe(expected)
  })
})
