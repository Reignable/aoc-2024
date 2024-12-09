import { getRulesAndUpdatesFromFile } from './getRulesAndUpdatesFromFile'
import { sumMiddles } from './sumMiddles'
import { updateIsValid } from './updateIsValid'

export default (filePath: string) => {
  const { rules, updates } = getRulesAndUpdatesFromFile(filePath)

  // Get valid updates using rules
  const validUpdates = updates.filter(update => updateIsValid(update, rules))

  // Sum middle values
  return sumMiddles(validUpdates)
}
