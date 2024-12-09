import { loadFileToString, split } from '@utils'

const getRulesAndUpdatesFromFile = (filePath: string) => {
  // Load file
  const file = loadFileToString(filePath)

  // Split file to rules and updates
  const [ruleString, updateString] = file.split('\n\n').map(split('\n'))
  const rules = ruleString.map(split('|'))
  const updates = updateString.map(split(','))

  return { rules, updates }
}

export { getRulesAndUpdatesFromFile }
