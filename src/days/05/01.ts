import { loadFileToString, split, sumArray } from '@utils'
import { updateIsValid } from './updateIsValid'

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
