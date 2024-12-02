type LeftRightLists = [left: number[], right: number[]]

const createLeftRightNumberLists = (inputRows: string[]): LeftRightLists =>
  inputRows.reduce<LeftRightLists>(([l, r], cur) => {
    const [leftValue, rightValue] = cur.split(' ').filter(Boolean).map(Number)
    return [[...l, leftValue], [...r, rightValue]] as LeftRightLists
  }, [[], []])

export { createLeftRightNumberLists }
