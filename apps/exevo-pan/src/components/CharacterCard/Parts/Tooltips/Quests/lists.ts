import { constTokens, tokens } from 'data-dictionary/dist/dictionaries/quest'

export const utilitary: string[] = [
  constTokens['The Postman Missions'],
  constTokens['The Djinn War - Marid Faction'],
  constTokens['The Djinn War - Efreet Faction'],
  constTokens['Recognised Trader'],
  constTokens['The Thieves Guild'],
  constTokens['Shadows of Yalahar'],
  constTokens['The Pits of Inferno'],
  constTokens['The Inquisition'],
]

export const access: string[] = [
  constTokens['Honorary Barbarian'],
  constTokens["Lion's Den Explorer"],
  constTokens['The Shattered Isles'],
  constTokens['The Ice Islands'],
  constTokens['Twenty Miles Beneath The Sea'],
  constTokens['The Explorer Society'],
  constTokens['Blood Brothers'],
  constTokens['The New Frontier'],
  constTokens['Wrath of the Emperor'],
  constTokens['The Ape City'],
  constTokens['Rathleton Citizen'],
  constTokens['Dark Trails'],
  constTokens['Lost Palace Raider'],
  constTokens['Dream Catcher'],
  constTokens['Library Liberator'],
  constTokens['Soul War'],
  constTokens['Primal Ordeal'],
  constTokens['Rotten Blood'],
]

export const bosses: string[] = [
  constTokens['Hero of Rathleton'],
  constTokens['Corruption Contained'],
  constTokens['Over the Moon'],
  constTokens['Drama in Darama'],
  constTokens['Honorary Gnome'],
  constTokens['Gnomish Art of War'],
  constTokens['Sun and Sea'],
  constTokens['Heart of Destruction'],
  constTokens.Beyonder,
  constTokens['Buried the Baron'],
  constTokens['His Days are Counted'],
  constTokens['Duked it Out'],
  constTokens["Ferumbras' Ascendant"],
  constTokens['A Study in Scarlett'],
  constTokens.Lionheart,
  constTokens['Millennial Falcon'],
]

const listedSet = new Set([...utilitary, ...access, ...bosses])
export const others: string[] = tokens.filter(
  (questToken) => !listedSet.has(questToken),
)
