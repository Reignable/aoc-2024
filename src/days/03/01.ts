import { loadFileToString, sumArray } from '@utils'
import { performMultiplicationInstruction } from './performMultiplicationInstruction'

const VALID_COMMAND_REGEX = /mul\(\d{1,3},\d{1,3}\)/g

const solution = (filePath: string) => {
  const memory = loadFileToString(filePath)
  const instructions = memory.match(VALID_COMMAND_REGEX)
  const products = instructions?.map(performMultiplicationInstruction) ?? []
  return sumArray(products)
}

export default solution
