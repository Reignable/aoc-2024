import * as dayFns from './days'
import Table from 'cli-table3'

const getInputDataFilePath = (dayNumber: string): string => `./days/${dayNumber}/data/input.txt`

const solutions = Object.entries(dayFns).reduce<(string | number)[][]>((all, [dayKey, solutionFns]) => {
  const dayNumber = dayKey.replace('d', '')
  const inputDataFilePath = getInputDataFilePath(dayNumber)

  return [...all, [dayNumber, ...Object.values(solutionFns).map(fn => fn(inputDataFilePath))]]
}, [])

const table = new Table({
  head: ['Day', 'Solution 01', 'Solution 02'],
  colAligns: ['left', 'right', 'right'],
})

table.push(...solutions)

console.log('🎄==== Advent of Code 2024 =====🎄')
console.log(table.toString())
