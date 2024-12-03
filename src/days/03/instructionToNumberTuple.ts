const instructionToNumberTuple = (instruction: string): [number, number] =>
  (instruction.match(/\d{1,3}/g)?.map(Number) ?? []) as [number, number]

export { instructionToNumberTuple }
