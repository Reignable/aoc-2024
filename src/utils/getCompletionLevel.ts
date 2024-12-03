import { Day } from '@types'

const getCompletionLevel = (day: Day) => {
  if (day[2]) return '🌟🌟'
  if (day[1]) return '🌟'
  return ''
}

export { getCompletionLevel }
