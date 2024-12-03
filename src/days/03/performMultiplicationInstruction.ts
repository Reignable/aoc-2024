import { instructionToNumberTuple } from './instructionToNumberTuple'

const performMultiplicationInstruction = (instruction: string): number => {
  const [a, b] = instructionToNumberTuple(instruction)
  return a * b
}

export { performMultiplicationInstruction }
