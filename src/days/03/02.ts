import { loadFileToString, sumArray } from '@utils'
import { performMultiplicationInstruction } from './performMultiplicationInstruction'

const VALID_COMMAND_REGEX = /(don't\(\))|(mul\(\d{1,3},\d{1,3}\))|(do\(\))/g

const solution = (filePath: string) => {
  const memory = loadFileToString(filePath)
  const instructions = memory.match(VALID_COMMAND_REGEX) ?? []

  let commandsToPerform: string[] = []
  let shouldTake = true
  for (const instruction of instructions) {
    if (instruction === 'don\'t()') shouldTake = false
    if (instruction === 'do()') shouldTake = true
    if (instruction.includes('mul') && shouldTake)
      commandsToPerform = [...commandsToPerform, instruction]
  }

  const products = commandsToPerform.map(performMultiplicationInstruction)
  return sumArray(products)
}

export default solution
