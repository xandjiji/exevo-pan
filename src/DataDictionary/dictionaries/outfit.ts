import {
  lowerCaseKeys,
  outfitsToScrapingTokens,
  dictionaryFactory,
} from '../utils'
import { OutfitToken } from '../types'

const outfits: OutfitToken[] = [
  {
    name: 'Citizen',
    id: {
      male: 128,
      female: 136,
    },
  },
  {
    name: 'Hunter',
    id: {
      male: 129,
      female: 137,
    },
  },
  {
    name: 'Mage',
    id: {
      male: 130,
      female: 138,
    },
  },
  {
    name: 'Knight',
    id: {
      male: 131,
      female: 139,
    },
  },
  {
    name: 'Nobleman',
    id: {
      male: 132,
      female: 140,
    },
  },
  {
    name: 'Summoner',
    id: {
      male: 133,
      female: 141,
    },
  },
  {
    name: 'Warrior',
    id: {
      male: 134,
      female: 142,
    },
  },
  {
    name: 'Barbarian',
    id: {
      male: 143,
      female: 147,
    },
  },
  {
    name: 'Druid',
    id: {
      male: 144,
      female: 148,
    },
  },
  {
    name: 'Wizard',
    id: {
      male: 145,
      female: 149,
    },
  },
  {
    name: 'Oriental',
    id: {
      male: 146,
      female: 150,
    },
  },
  {
    name: 'Pirate',
    id: {
      male: 151,
      female: 155,
    },
  },
  {
    name: 'Assassin',
    id: {
      male: 152,
      female: 156,
    },
  },
  {
    name: 'Beggar',
    id: {
      male: 153,
      female: 157,
    },
  },
  {
    name: 'Shaman',
    id: {
      male: 154,
      female: 158,
    },
  },
  {
    name: 'Norseman',
    id: {
      male: 251,
      female: 252,
    },
  },
  {
    name: 'Nightmare',
    id: {
      male: 268,
      female: 269,
    },
  },
  {
    name: 'Jester',
    id: {
      male: 273,
      female: 270,
    },
  },
  {
    name: 'Brotherhood',
    id: {
      male: 278,
      female: 279,
    },
  },
  {
    name: 'Demon Hunter',
    id: {
      male: 289,
      female: 288,
    },
  },
  {
    name: 'Yalaharian',
    id: {
      male: 324,
      female: 325,
    },
  },
  {
    name: 'Newly Wed',
    id: {
      male: 328,
      female: 329,
    },
  },
  {
    name: 'Warmaster',
    id: {
      male: 335,
      female: 336,
    },
  },
  {
    name: 'Wayfarer',
    id: {
      male: 366,
      female: 367,
    },
  },
  {
    name: 'Afflicted',
    id: {
      male: 430,
      female: 431,
    },
  },
  {
    name: 'Elementalist',
    id: {
      male: 432,
      female: 433,
    },
  },
  {
    name: 'Deepling',
    id: {
      male: 463,
      female: 464,
    },
  },
  {
    name: 'Insectoid',
    id: {
      male: 465,
      female: 466,
    },
  },
  {
    name: 'Crystal Warlord',
    id: {
      male: 512,
      female: 513,
    },
  },
  {
    name: 'Soil Guardian',
    id: {
      male: 516,
      female: 514,
    },
  },
  {
    name: 'Demon Outfit',
    id: {
      male: 542,
      female: 541,
    },
  },
  {
    name: 'Cave Explorer',
    id: {
      male: 574,
      female: 575,
    },
  },
  {
    name: 'Dream Warden',
    id: {
      male: 577,
      female: 578,
    },
  },
  {
    name: 'Glooth Engineer',
    id: {
      male: 610,
      female: 618,
    },
  },
  {
    name: 'Jersey',
    id: {
      male: 619,
      female: 620,
    },
  },
  {
    name: 'Recruiter',
    id: {
      male: 746,
      female: 745,
    },
  },
  {
    name: 'Rift Warrior',
    id: {
      male: 846,
      female: 845,
    },
  },
  {
    name: 'Festive Outfit',
    id: {
      male: 931,
      female: 929,
    },
  },
  {
    name: 'Makeshift Warrior',
    id: {
      male: 1042,
      female: 1043,
    },
  },
  {
    name: 'Battle Mage',
    id: {
      male: 1069,
      female: 1070,
    },
  },
  {
    name: 'Discoverer',
    id: {
      male: 1094,
      female: 1095,
    },
  },
  {
    name: 'Dream Warrior',
    id: {
      male: 1146,
      female: 1147,
    },
  },
  {
    name: 'Percht Raider',
    id: {
      male: 1161,
      female: 1162,
    },
  },
  {
    name: 'Golden Outfit',
    id: {
      male: 1210,
      female: 1211,
    },
  },
  {
    name: 'Hand of the Inquisition',
    id: {
      male: 1243,
      female: 1244,
    },
  },
  {
    name: 'Orcsoberfest Garb',
    id: {
      male: 1251,
      female: 1252,
    },
  },
  {
    name: 'Poltergeist',
    id: {
      male: 1270,
      female: 1271,
    },
  },
  {
    name: 'Falconer',
    id: {
      male: 1282,
      female: 1283,
    },
  },
  {
    name: 'Revenant',
    id: {
      male: 1322,
      female: 1323,
    },
  },
  {
    name: 'Rascoohan',
    id: {
      male: 1371,
      female: 1372,
    },
  },
  {
    name: 'Citizen of Issavi',
    id: {
      male: 1386,
      female: 1387,
    },
  },
  {
    name: 'Royal Bounacean Advisor',
    id: {
      male: 1436,
      female: 1437,
    },
  },
  {
    name: 'Royal Costume',
    id: {
      male: 1457,
      female: 1456,
    },
  },
]

export const scrapingTokens = lowerCaseKeys(outfitsToScrapingTokens(outfits))

export const tokens = Object.values(scrapingTokens)

export const dictionary = dictionaryFactory(tokens)
