export const lowerCaseKeys = (object: ScrapingTokens): ScrapingTokens => {
  const newObject: ScrapingTokens = {}
  Object.keys(object).forEach((key) => {
    newObject[key.toLowerCase()] = object[key]
  })

  return newObject
}

export const nameableToScrapingTokens = (
  outfitArray: { name: string }[],
): ScrapingTokens => {
  const names = outfitArray.map(({ name }) => name)

  const scrapingTokens: ScrapingTokens = {}
  names.forEach((name) => {
    scrapingTokens[name] = name
  })

  return scrapingTokens
}

export const dictionaryFactory = (keyArray: string[]): Dictionary => {
  const dictionaryObject: Dictionary = {}

  keyArray.forEach((value, index) => {
    dictionaryObject[index] = value
    dictionaryObject[value] = index
  })

  return dictionaryObject
}
