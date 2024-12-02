import { readFileSync } from 'fs'
import path from 'path'

const loadFileToString = (filePath: string): string => {
  return readFileSync(path.join(`${process.cwd()}/src/`, filePath), 'utf-8')
}

export { loadFileToString }
