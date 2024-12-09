import { loadFileToString, sumArray } from '@utils'

const split = (separator: string | RegExp) => (value: string) => value.split(separator)

const updateIsValid = (update: string[], rules: string[][]): boolean => {
  for (const page of update) {
    const pageIndex = update.indexOf(page)
    const rulesForPage = rules.filter(rule => rule[0] === page)

    if (rulesForPage.length === 0) continue

    for (const [,rule] of rulesForPage) {
      const ruleIndex = update.indexOf(rule)
      if (ruleIndex === -1) continue
      if (pageIndex > ruleIndex) {
        return false
      }
    }
  }
  return true
}

export default (filePath: string) => {
  // Load file
  const file = loadFileToString(filePath)

  // Split file to rules and updates
  const [ruleString, updateString] = file.split('\n\n').map(split('\n'))
  const rules = ruleString.map(split('|'))
  const updates = updateString.map(split(','))

  // Get valid updates using rules
  const validUpdates = updates.filter(update => updateIsValid(update, rules))

  // Get middle value of each valid update
  const middles = validUpdates
    .map(update => update[Math.floor(update.length / 2)])
    .map(Number)

  // Sum middle values
  return sumArray(middles)
}
