type Solution = { star_index: number, get_star_ts: number }
type Day = { 1: Solution, 2: Solution }
type Member = { completion_day_level: Record<string, Day> }
type Leaderboard = {
  members: Record<string, Member>
}

export { Leaderboard, Day }
