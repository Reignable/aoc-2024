import { loadFileToString, sumArray } from '@utils'

const VALID_COMMAND_REGEX = /mul\(\d{1,3},\d{1,3}\)/g

const instructionToNumberPair = (instruction: string): number[] =>
  instruction.match(/\d{1,3}/g)?.map(Number) ?? []

const solution = (filePath: string) => {
  const memory = loadFileToString(filePath)
  const instructions = memory.match(VALID_COMMAND_REGEX)
  const numberPairs = instructions?.map(instructionToNumberPair)
  const products = numberPairs?.map(([a, b]) => a * b) ?? []
  return sumArray(products)
}

export default solution
