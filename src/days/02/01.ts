import { loadFileRows } from '@utils'

type ReportSafety = 'SAFE' | 'UNSAFE'
type ReportDirection = 'INC' | 'DEC'

export const pairIsUnsafe = (direction: ReportDirection, difference: number) => {
  if (direction === 'INC')
    return difference >= 0 || difference < -3
  if (direction === 'DEC')
    return difference <= 0 || difference > 3
  return false
}

const getReportSafety = (report: number[]): ReportSafety => {
  if (report.length < 2) return 'SAFE'

  const direction: ReportDirection = report[1] > report[0] ? 'INC' : 'DEC'

  for (let i = 1; i < report.length; i++) {
    const difference = report[i - 1] - report[i]
    if (pairIsUnsafe(direction, difference)) {
      return 'UNSAFE'
    }
  }

  return 'SAFE'
}

const solution = (filePath: string) => {
  const rows = loadFileRows(filePath)
  const reports = rows.map(row => row.split(' ').map(Number))
  const results = reports.map(getReportSafety)
  const safeCount = results.reduce((count, result) => count + +(result === 'SAFE'), 0)
  return safeCount
}

export default solution
