import { lowerCaseKeys, dictionaryFactory } from '../utils'

export const constTokens = {
  Biodegradable: 'Biodegradable',
  Fearless: 'Fearless',
  Goldhunter: 'Goldhunter',
  'His True Face': 'His True Face',
  'Razing!': 'Razing!',
  'The More the Merrier': 'The More the Merrier',
} as const

export const scrapingTokens = lowerCaseKeys(constTokens)

export const tokens: string[] = Object.values(scrapingTokens)

export const dictionary = dictionaryFactory(tokens)
