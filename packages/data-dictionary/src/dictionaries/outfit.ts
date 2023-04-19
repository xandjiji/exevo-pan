import {
  lowerCaseKeys,
  nameableToScrapingTokens,
  dictionaryFactory,
} from '../utils'

export const outfits: OutfitToken[] = [
  {
    name: 'Citizen',
    id: {
      male: 128,
      female: 136,
    },
    value: 0,
  },
  {
    name: 'Hunter',
    id: {
      male: 129,
      female: 137,
    },
    value: 0,
  },
  {
    name: 'Mage',
    id: {
      male: 130,
      female: 138,
    },
    value: 0,
  },
  {
    name: 'Knight',
    id: {
      male: 131,
      female: 139,
    },
    value: 0,
  },
  {
    name: 'Nobleman',
    id: {
      male: 132,
      female: 140,
    },
    value: 0,
  },
  {
    name: 'Summoner',
    id: {
      male: 133,
      female: 141,
    },
    value: 0,
  },
  {
    name: 'Warrior',
    id: {
      male: 134,
      female: 142,
    },
    value: 0,
  },
  {
    name: 'Barbarian',
    id: {
      male: 143,
      female: 147,
    },
    value: 0,
  },
  {
    name: 'Druid',
    id: {
      male: 144,
      female: 148,
    },
    value: 0,
  },
  {
    name: 'Wizard',
    id: {
      male: 145,
      female: 149,
    },
    value: 0,
  },
  {
    name: 'Oriental',
    id: {
      male: 146,
      female: 150,
    },
    value: 0,
  },
  {
    name: 'Pirate',
    id: {
      male: 151,
      female: 155,
    },
    value: 0,
  },
  {
    name: 'Assassin',
    id: {
      male: 152,
      female: 156,
    },
    value: 0,
  },
  {
    name: 'Beggar',
    id: {
      male: 153,
      female: 157,
    },
    value: 0,
  },
  {
    name: 'Shaman',
    id: {
      male: 154,
      female: 158,
    },
    value: 0,
  },
  {
    name: 'Norseman',
    id: {
      male: 251,
      female: 252,
    },
    value: 0,
  },
  {
    name: 'Nightmare',
    id: {
      male: 268,
      female: 269,
    },
    value: 0,
  },
  {
    name: 'Jester',
    id: {
      male: 273,
      female: 270,
    },
    value: 0,
  },
  {
    name: 'Brotherhood',
    id: {
      male: 278,
      female: 279,
    },
    value: 0,
  },
  {
    name: 'Demon Hunter',
    id: {
      male: 289,
      female: 288,
    },
    value: 0,
  },
  {
    name: 'Yalaharian',
    id: {
      male: 324,
      female: 325,
    },
    value: 0,
  },
  {
    name: 'Newly Wed',
    id: {
      male: 328,
      female: 329,
    },
    value: 0,
  },
  {
    name: 'Warmaster',
    id: {
      male: 335,
      female: 336,
    },
    value: 0,
  },
  {
    name: 'Wayfarer',
    id: {
      male: 366,
      female: 367,
    },
    value: 0,
  },
  {
    name: 'Afflicted',
    id: {
      male: 430,
      female: 431,
    },
    value: 0,
  },
  {
    name: 'Elementalist',
    id: {
      male: 432,
      female: 433,
    },
    value: 0,
  },
  {
    name: 'Deepling',
    id: {
      male: 463,
      female: 464,
    },
    value: 0,
  },
  {
    name: 'Insectoid',
    id: {
      male: 465,
      female: 466,
    },
    value: 0,
  },
  {
    name: 'Crystal Warlord',
    id: {
      male: 512,
      female: 513,
    },
    value: 0,
  },
  {
    name: 'Soil Guardian',
    id: {
      male: 516,
      female: 514,
    },
    value: 0,
  },
  {
    name: 'Demon Outfit',
    id: {
      male: 542,
      female: 541,
    },
    value: 0,
  },
  {
    name: 'Cave Explorer',
    id: {
      male: 574,
      female: 575,
    },
    value: 0,
  },
  {
    name: 'Dream Warden',
    id: {
      male: 577,
      female: 578,
    },
    value: 0,
  },
  {
    name: 'Glooth Engineer',
    id: {
      male: 610,
      female: 618,
    },
    value: 0,
  },
  {
    name: 'Jersey',
    id: {
      male: 619,
      female: 620,
    },
    value: 0,
  },
  {
    name: 'Recruiter',
    id: {
      male: 746,
      female: 745,
    },
    value: 0,
  },
  {
    name: 'Rift Warrior',
    id: {
      male: 846,
      female: 845,
    },
    value: 0,
  },
  {
    name: 'Festive Outfit',
    id: {
      male: 931,
      female: 929,
    },
    value: 0,
  },
  {
    name: 'Makeshift Warrior',
    id: {
      male: 1042,
      female: 1043,
    },
    value: 0,
  },
  {
    name: 'Battle Mage',
    id: {
      male: 1069,
      female: 1070,
    },
    value: 0,
  },
  {
    name: 'Discoverer',
    id: {
      male: 1094,
      female: 1095,
    },
    value: 0,
  },
  {
    name: 'Dream Warrior',
    id: {
      male: 1146,
      female: 1147,
    },
    value: 0,
  },
  {
    name: 'Percht Raider',
    id: {
      male: 1161,
      female: 1162,
    },
    value: 0,
  },
  {
    name: 'Golden Outfit',
    id: {
      male: 1210,
      female: 1211,
    },
    value: 0,
  },
  {
    name: 'Hand of the Inquisition',
    id: {
      male: 1243,
      female: 1244,
    },
    value: 0,
  },
  {
    name: 'Orcsoberfest Garb',
    id: {
      male: 1251,
      female: 1252,
    },
    value: 0,
  },
  {
    name: 'Poltergeist',
    id: {
      male: 1270,
      female: 1271,
    },
    value: 0,
  },
  {
    name: 'Falconer',
    id: {
      male: 1282,
      female: 1283,
    },
    value: 0,
  },
  {
    name: 'Revenant',
    id: {
      male: 1322,
      female: 1323,
    },
    value: 0,
  },
  {
    name: 'Rascoohan',
    id: {
      male: 1371,
      female: 1372,
    },
    value: 0,
  },
  {
    name: 'Citizen of Issavi',
    id: {
      male: 1386,
      female: 1387,
    },
    value: 0,
  },
  {
    name: 'Royal Bounacean Advisor',
    id: {
      male: 1436,
      female: 1437,
    },
    value: 0,
  },
  {
    name: 'Royal Costume',
    id: {
      male: 1457,
      female: 1456,
    },
    value: 0,
  },
  {
    name: 'Formal Dress',
    id: {
      male: 1460,
      female: 1461,
    },
    value: 0,
  },
  {
    name: 'Fire-Fighter',
    id: {
      male: 1569,
      female: 1568,
    },
    value: 0,
  },
  {
    name: 'Ancient Aucar',
    id: {
      male: 1597,
      female: 1598,
    },
    value: 0,
  },
  {
    name: 'Lion of War',
    id: {
      male: 1652,
      female: 1653,
    },
    value: 0,
  },
]

export const scrapingTokens = lowerCaseKeys(nameableToScrapingTokens(outfits))

export const tokens: string[] = Object.values(scrapingTokens)

export const dictionary = dictionaryFactory(tokens)
