import { getRulesAndUpdatesFromFile } from './getRulesAndUpdatesFromFile'
import { sumMiddles } from './sumMiddles'
import { updateIsValid } from './updateIsValid'

export const comparePage = (rules: string[][]) =>
  (a: string, b: string): number =>
    rules.some(([left, right]) => left === a && right === b) ? -1 : 0

export default (filePath: string) => {
  // Get rules and updates
  const { rules, updates } = getRulesAndUpdatesFromFile(filePath)
  const pageComparator = comparePage(rules)

  // Get all invalid updates
  const invalidUpdates = updates.filter(update => !updateIsValid(update, rules))

  // Sort invalid updates
  const sortedUpdates = invalidUpdates.map(update => update.toSorted(pageComparator))

  // Return sum of middle values
  return sumMiddles(sortedUpdates)
}
