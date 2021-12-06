import { scrapingTokens, tokens } from 'DataDictionary/dictionaries/quest'

export const utilitary: string[] = [
  scrapingTokens['The Postman Missions'],
  scrapingTokens['The Djinn War - Marid Faction'],
  scrapingTokens['The Djinn War - Efreet Faction'],
  scrapingTokens['Recognised Trader'],
  scrapingTokens['The Thieves Guild'],
  scrapingTokens['Shadows of Yalahar'],
  scrapingTokens['The Pits of Inferno'],
  scrapingTokens['The Inquisition'],
]

export const access: string[] = [
  scrapingTokens['Honorary Barbarian'],
  scrapingTokens["Lion's Den Explorer"],
  scrapingTokens['The Shattered Isles'],
  scrapingTokens['The Ice Islands'],
  scrapingTokens['Twenty Miles Beneath The Sea'],
  scrapingTokens['The Explorer Society'],
  scrapingTokens['Blood Brothers'],
  scrapingTokens['The New Frontier'],
  scrapingTokens['Wrath of the Emperor'],
  scrapingTokens['The Ape City'],
  scrapingTokens['Rathleton Citizen'],
  scrapingTokens['Dark Trails'],
  scrapingTokens['Lost Palace Raider'],
  scrapingTokens['Dream Catcher'],
  scrapingTokens['Library Liberator'],
  scrapingTokens['Soul War'],
]

export const bosses: string[] = [
  scrapingTokens['Hero of Rathleton'],
  scrapingTokens['Corruption Contained'],
  scrapingTokens['Over the Moon'],
  scrapingTokens['Drama in Darama'],
  scrapingTokens['Honorary Gnome'],
  scrapingTokens['Gnomish Art of War'],
  scrapingTokens['Sun and Sea'],
  scrapingTokens['Heart of Destruction'],
  scrapingTokens.Beyonder,
  scrapingTokens['Buried the Baron'],
  scrapingTokens['His Days are Counted'],
  scrapingTokens['Duked it Out'],
  scrapingTokens["Ferumbras' Ascendant"],
  scrapingTokens['A Study in Scarlett'],
  scrapingTokens.Lionheart,
  scrapingTokens['Millennial Falcon'],
]

const listedSet = new Set([...utilitary, ...access, ...bosses])
export const others: string[] = tokens.filter((quest) => !listedSet.has(quest))
