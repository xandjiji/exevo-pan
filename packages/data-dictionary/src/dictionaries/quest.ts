import { dictionaryFactory, lowerCaseKeys } from '../utils'

export const constTokens = {
  'The Postman Missions': 'The Postman Missions',
  'The Djinn War - Marid Faction': 'The Djinn War (blue)',
  'The Djinn War - Efreet Faction': 'The Djinn War (green)',
  'Recognised Trader': 'The Travelling Trader (Rashid)',
  'The Thieves Guild': 'The Thieves Guild',
  'The Explorer Society': 'The Explorer Society',
  'Shadows of Yalahar': 'Shadows of Yalahar',
  'Honorary Barbarian': 'Barbarian Test',
  "Lion's Den Explorer": "Lion's Rock",
  'The Shattered Isles': 'The Shattered Isles',
  'Twenty Miles Beneath The Sea': 'Twenty Miles Beneath the Sea',
  'Blood Brothers': 'Blood Brothers',
  'The Ice Islands': 'The Ice Islands',
  'The New Frontier': 'The New Frontier',
  'Wrath of the Emperor': 'Wrath of the Emperor',
  'The Ape City': 'The Ape City',
  'The Pits of Inferno': 'The Pits of Inferno',
  'The Inquisition': 'The Inquisition',
  'Rathleton Citizen': 'Rathleton (Citzen)',
  'Hero of Rathleton': 'Hero of Rathleton',
  'Lost Palace Raider': 'Asura Palace',
  'Corruption Contained': 'Cults of Tibia',
  'Dark Trails': 'Dark Trails',
  'Drama in Darama': 'Grimvale',
  'Dream Catcher': 'The Dream Courts',
  'Heart of Destruction': 'Heart of Destruction',
  'Over the Moon': 'The Curse Spreads',
  'Sun and Sea': 'Kilmaresh',
  Beyonder: 'Feaster of Souls',
  'Library Liberator': 'The Secret Library',
  "Ferumbras' Ascendant": "Ferumbras' Ascendant",
  'A Study in Scarlett': 'The Order of the Cobra',
  'Millennial Falcon': 'The Order of the Falcon',
  Lionheart: 'The Order of the Lion',
  'Honorary Gnome': "Bigfoot's Burden (Rank IV)",
  'Gnomish Art of War': "Bigfoot's Burden (Free boss access)",
  'Buried the Baron': 'Dangerous Depths (Warzone 4)',
  'His Days are Counted': 'Dangerous Depths (Warzone 5)',
  'Duked it Out': 'Dangerous Depths (Warzone 6)',
  'Soul War': 'Soul War',
  'Primal Ordeal': 'Primal Ordeal',
  'Rotten Blood': 'Rotten Blood',
} as const

export const scrapingTokens = lowerCaseKeys(constTokens)

export const tokens: string[] = Object.values(scrapingTokens)

export const dictionary = dictionaryFactory(tokens)
