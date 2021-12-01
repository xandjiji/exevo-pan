import { dictionaryFactory } from '../utils'

export const scrapingTokens = {
  'His True Face': 'His True Face',
  'Razing!': 'Razing!',
  'The More the Merrier': 'The More the Merrier',
}

export const tokens = Object.values(scrapingTokens)

export const dictionary = dictionaryFactory(tokens)
