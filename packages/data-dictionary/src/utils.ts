export const lowerCaseKeys = (object: ScrapingTokens): ScrapingTokens => {
  const newObject: ScrapingTokens = {}
  Object.keys(object).forEach((key) => {
    newObject[key.toLowerCase()] = object[key]
  })

  return newObject
}

export const nameableToScrapingTokens = (
  nameableArray: Nameable[],
): ScrapingTokens => {
  const names = nameableArray.map(({ name }) => name)

  const scrapingTokens: ScrapingTokens = {}
  names.forEach((name) => {
    scrapingTokens[name] = name
  })

  return scrapingTokens
}

export const cosmeticToPriceMap = (cosmeticArray: Cosmetic[]): PriceMap => {
  const priceMap: PriceMap = {}
  cosmeticArray.forEach(({ name, value }) => {
    priceMap[name] = value
  })

  return priceMap
}

export const dictionaryFactory = (keyArray: string[]): Dictionary => {
  const dictionaryObject: Dictionary = {}

  keyArray.forEach((value, index) => {
    dictionaryObject[index] = value
    dictionaryObject[value] = index
  })

  return dictionaryObject
}

type Identity<T extends readonly string[]> = {
  [K in T[number]]: K
}

export const generateIdentity = <T extends readonly string[]>(
  tokens: T,
): Identity<T> => {
  const identity = {} as Identity<T>

  tokens.forEach((token) => {
    ;(identity as any)[token] = token
  })

  return identity
}
