import { describe, expect, it } from 'vitest'
import { s01, s02 } from '.'
import { getTestFilePath } from '@utils'
import { nextMoveIsOffGrid, updateGrid } from './01'

const testFilePath = getTestFilePath('06')

describe('01', () => {
  it('Counts unique locations the guard enters', () => {
    expect(s01(testFilePath)).toBe(41)
  })
})

describe('02', () => {
  it('Calculates where to put an obstruction to loop the guard', () => {
    expect(s02(testFilePath)).toBe(6)
  })
})

describe('nextMoveIsOffGrid', () => {
  it('returns true if going up', () => {
    expect(nextMoveIsOffGrid([
      ['.', '^', '.'],
      ['.', '.', '.'],
      ['.', '.', '.'],
    ])).toBe(true)
  })

  it('returns true if going down', () => {
    expect(nextMoveIsOffGrid([
      ['.', '.', '.'],
      ['.', '.', '.'],
      ['.', 'V', '.'],
    ])).toBe(true)
  })

  it('returns true if going left', () => {
    expect(nextMoveIsOffGrid([
      ['.', '.', '.'],
      ['<', '.', '.'],
      ['.', '.', '.'],
    ])).toBe(true)
  })

  it('returns true if going right', () => {
    expect(nextMoveIsOffGrid([
      ['.', '.', '.'],
      ['.', '.', '>'],
      ['.', '.', '.'],
    ])).toBe(true)
  })

  it('returns false if obstructed', () => {
    expect(nextMoveIsOffGrid([
      ['.', '.', '.'],
      ['.', '>', '#'],
      ['.', '.', '.'],
    ])).toBe(false)
  })

  it('returns false if empty space', () => {
    expect(nextMoveIsOffGrid([
      ['.', '.', '.'],
      ['.', '>', '.'],
      ['.', '.', '.'],
    ])).toBe(false)
  })

  it('returns false if visited space', () => {
    expect(nextMoveIsOffGrid([
      ['.', '.', '.'],
      ['.', '>', 'X'],
      ['.', '.', '.'],
    ])).toBe(false)
  })
})

describe('updateGrid', () => {
  it('Moves up', () => {
    const current = [
      ['.', '.', '.'],
      ['.', '^', '.'],
      ['.', '.', '.'],
    ]
    const expected = [
      ['.', '^', '.'],
      ['.', 'X', '.'],
      ['.', '.', '.'],
    ]
    expect(updateGrid(current)).toEqual(expected)
  })

  it('Moves right', () => {
    const current = [
      ['.', '.', '.'],
      ['.', '>', '.'],
      ['.', '.', '.'],
    ]
    const expected = [
      ['.', '.', '.'],
      ['.', 'X', '>'],
      ['.', '.', '.'],
    ]
    expect(updateGrid(current)).toEqual(expected)
  })

  it('Moves down', () => {
    const current = [
      ['.', '.', '.'],
      ['.', 'V', '.'],
      ['.', '.', '.'],
    ]
    const expected = [
      ['.', '.', '.'],
      ['.', 'X', '.'],
      ['.', 'V', '.'],
    ]
    expect(updateGrid(current)).toEqual(expected)
  })

  it('Moves left', () => {
    const current = [
      ['.', '.', '.'],
      ['.', '<', '.'],
      ['.', '.', '.'],
    ]
    const expected = [
      ['.', '.', '.'],
      ['<', 'X', '.'],
      ['.', '.', '.'],
    ]
    expect(updateGrid(current)).toEqual(expected)
  })

  describe('Handles obstacles', () => {
    it('up', () => {
      const current = [
        ['.', '#', '.'],
        ['.', '^', '.'],
        ['.', '.', '.'],
      ]
      const expected = [
        ['.', '#', '.'],
        ['.', 'X', '>'],
        ['.', '.', '.'],
      ]
      expect(updateGrid(current)).toEqual(expected)
    })

    it('right', () => {
      const current = [
        ['.', '.', '.'],
        ['.', '>', '#'],
        ['.', '.', '.'],
      ]
      const expected = [
        ['.', '.', '.'],
        ['.', 'X', '#'],
        ['.', 'V', '.'],
      ]
      expect(updateGrid(current)).toEqual(expected)
    })

    it('down', () => {
      const current = [
        ['.', '.', '.'],
        ['.', 'V', '.'],
        ['.', '#', '.'],
      ]
      const expected = [
        ['.', '.', '.'],
        ['<', 'X', '.'],
        ['.', '#', '.'],
      ]
      expect(updateGrid(current)).toEqual(expected)
    })

    it('left', () => {
      const current = [
        ['.', '.', '.'],
        ['#', '<', '.'],
        ['.', '.', '.'],
      ]
      const expected = [
        ['.', '^', '.'],
        ['#', 'X', '.'],
        ['.', '.', '.'],
      ]
      expect(updateGrid(current)).toEqual(expected)
    })
  })

  it('Handles already visited spaces', () => {
    const current = [
      ['.', '.', '.'],
      ['.', 'X', '.'],
      ['.', '^', '.'],
    ]
    const expected = [
      ['.', '.', '.'],
      ['.', '^', '.'],
      ['.', 'X', '.'],
    ]
    expect(updateGrid(current)).toEqual(expected)
  })
})
