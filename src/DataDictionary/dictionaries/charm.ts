import { dictionaryFactory } from '../utils'

export const scrapingTokens = {
  Dodge: 'Dodge',
  Wound: 'Wound',
  Curse: 'Curse',
  Zap: 'Zap',
  Enflame: 'Enflame',
  Freeze: 'Freeze',
  'Low Blow': 'Low Blow',
  Parry: 'Parry',
  Poison: 'Poison',
  'Divine Wrath': 'Divine Wrath',
  Cripple: 'Cripple',
  Cleanse: 'Cleanse',
  'Adrenaline Burst': 'Adrenaline Burst',
  'Vampiric Embrace': 'Vampiric Embrace',
  Numb: 'Numb',
  "Void's Call": "Void's Call",
  Scavenge: 'Scavenge',
  Gut: 'Gut',
  Bless: 'Bless',
}

export const tokens = Object.values(scrapingTokens)

export const dictionary = dictionaryFactory(tokens)
