import { getPrivateLeaderboard } from '@api'
import { Leaderboard } from '@types'
import { getInputFilePath } from '@utils'
import Table from 'cli-table3'
import * as dotenv from 'dotenv'
import { getCompletionLevel } from 'utils/getCompletionLevel'
import * as dayFns from './days'

dotenv.config()

let leaderboard: Leaderboard

const run = async () => {
  if (!leaderboard) {
    leaderboard = await getPrivateLeaderboard(process.env.USER_ID ?? '')
  }

  const solutions = Object.entries(dayFns).reduce<(string | number)[][]>((all, [dayKey, solutionFns]) => {
    const dayNumber = dayKey.replace('d', '')
    const inputDataFilePath = getInputFilePath(dayNumber)

    return [
      ...all,
      [
        dayNumber,
        ...Object.values(solutionFns).map(fn => fn(inputDataFilePath)),
        getCompletionLevel(
          leaderboard.members[process.env.USER_ID ?? ''].completion_day_level[dayNumber.replace('0', '')],
        ),
      ],
    ]
  }, [])

  const table = new Table({
    head: ['Day', 'Solution 01', 'Solution 02', 'Completion'],
    colAligns: ['left', 'right', 'right', 'right'],
  })

  table.push(...solutions)

  console.log('🎄==== Advent of Code 2024 =====🎄')
  console.log(table.toString())
}

run()
