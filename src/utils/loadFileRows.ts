import { loadFileToString } from './loadFileToString'

const loadFileRows = (filePath: string) => {
  const fileString = loadFileToString(filePath)
  return fileString.split('\n')
}

export { loadFileRows }
