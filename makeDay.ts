import { mkdirSync, readdirSync, writeFileSync } from 'fs'
import path from 'path'

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
const dayRegex = /^\d{2}$/

if (!day) {
  console.error('A day is required')
  process.exit(1)
}

if (!dayRegex.test(day)) {
  console.error('Day must be two digits')
  process.exit(1)
}

const daysRoot = './src/days'
const dayPath = `${daysRoot}/${day}`
const dataPath = `${dayPath}/data`

mkdirSync(dayPath)
mkdirSync(dataPath)
writeFileSync(`${dayPath}/index.ts`, indexTemplate)
writeFileSync(`${dayPath}/index.test.ts`, testTemplate)
writeFileSync(`${dayPath}/01.ts`, solutionTemplate)
writeFileSync(`${dayPath}/02.ts`, solutionTemplate)
writeFileSync(`${dataPath}/test.txt`, '')
writeFileSync(`${dataPath}/input.txt`, '')

const dayDirectories = readdirSync(daysRoot)
  .filter(file => dayRegex.test(file))

const imports = dayDirectories
  .map(file => `import * as d${file.slice(0, 2)} from './${file}'`)
  .join('\n')
const exports = `export {\n${dayDirectories.map(file => `  d${file.slice(0, 2)},`).join('\n')}\n}`

const content = `${imports}\n\n${exports}\n`

writeFileSync(path.join(daysRoot, 'index.ts'), content)
