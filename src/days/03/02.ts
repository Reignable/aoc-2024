import { loadFileToString, sumArray } from '@utils'
import { performMultiplicationInstruction } from './performMultiplicationInstruction'

const VALID_COMMAND_REGEX = /(don't\(\))|(mul\(\d{1,3},\d{1,3}\))|(do\(\))/g

const solution = (filePath: string) => {
  const memory = loadFileToString(filePath)
  const instructions = memory.match(VALID_COMMAND_REGEX) ?? []

  let shouldTake = true
  const commandsToPerform = instructions.reduce<string[]>((acc, instruction) => {
    if (instruction.includes('mul') && shouldTake) return [...acc, instruction]
    shouldTake = instruction === 'do()'
    return acc
  }, [])

  const products = commandsToPerform.map(performMultiplicationInstruction)
  return sumArray(products)
}

export default solution
