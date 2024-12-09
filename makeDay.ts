import { mkdirSync, writeFileSync } from 'fs'

const solutionTemplate
= `export default (filePath: string) => {}
`
const indexTemplate
= `export { default as s01 } from './01'
export { default as s02 } from './02'
`
const testTemplate
= `import { describe, expect, it } from 'vitest'
import { s01, s02 } from '.'

describe('01', () => {
  it.todo('passes')
})

describe('02', () => {
  it.todo('passes')
})
`

const [,,day] = process.argv

if (!day) {
  console.error('A day is required')
  process.exit(1)
}

if (!/\d{2}/.test(day)) {
  console.error('Day must be two digits')
  process.exit(1)
}

const path = `./src/days/${day}`
const dataPath = `${path}/data`

mkdirSync(path)
mkdirSync(dataPath)
writeFileSync(`${path}/index.ts`, indexTemplate)
writeFileSync(`${path}/index.test.ts`, testTemplate)
writeFileSync(`${path}/01.ts`, solutionTemplate)
writeFileSync(`${path}/02.ts`, solutionTemplate)
writeFileSync(`${dataPath}/test.txt`, '')
writeFileSync(`${dataPath}/input.txt`, '')
