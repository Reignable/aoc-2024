import { Leaderboard } from '@types'

const getPrivateLeaderboard = async (leaderboardId: string): Promise<Leaderboard> => {
  const response = await fetch(
    `https://adventofcode.com/2024/leaderboard/private/view/${leaderboardId}.json`,
    {
      headers: {
        cookie: `session=${process.env.SESSION_COOKIE}`,
      },
    })
  return response.json() as Promise<Leaderboard>
}

export { getPrivateLeaderboard }
