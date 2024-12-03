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

export const getReportSafety = (useProblemDampener: boolean) => (report: number[]): ReportSafety => {
  if (report.length < 2) return 'SAFE'

  const direction: ReportDirection = report[1] > report[0] ? 'INC' : 'DEC'

  for (let i = 1; i < report.length; ++i) {
    const difference = report[i - 1] - report[i]

    if (pairIsUnsafe(direction, difference)) {
      if (useProblemDampener) {
        const newResults = [i, i + 1, i - 1, i - 2]
          .filter(index => index >= 0 && index < report.length)
          .map(
            index => getReportSafety(false)(report.toSpliced(index, 1)),
          )
        return newResults.every(result => result === 'UNSAFE') ? 'UNSAFE' : 'SAFE'
      }
      else {
        return 'UNSAFE'
      }
    }
  }

  return 'SAFE'
}

const countSafeReports = (filePath: string, { useProblemDampener } = { useProblemDampener: false }) => {
  const rows = loadFileRows(filePath)
  const reports = rows.map(row => row.split(' ').map(Number))
  const results = reports.map(getReportSafety(useProblemDampener))
  const safeCount = results.reduce((count, result) => count + +(result === 'SAFE'), 0)
  return safeCount
}

export { countSafeReports }
