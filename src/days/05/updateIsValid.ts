const updateIsValid = (update: string[], rules: string[][]): boolean => {
  for (const page of update) {
    const pageIndex = update.indexOf(page)
    const rulesForPage = rules.filter(rule => rule[0] === page)

    if (rulesForPage.length === 0) continue

    for (const [,rule] of rulesForPage) {
      const ruleIndex = update.indexOf(rule)
      if (ruleIndex === -1) continue
      if (pageIndex > ruleIndex) {
        return false
      }
    }
  }
  return true
}

export { updateIsValid }
