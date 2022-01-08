import {
  lowerCaseKeys,
  nameableToScrapingTokens,
  dictionaryFactory,
} from '../utils'

export const outfits: OutfitToken[] = [
  {
    name: 'Entrepreneur',
    id: {
      male: 472,
      female: 471,
    },
  },
  {
    name: 'Champion',
    id: {
      male: 633,
      female: 632,
    },
  },
  {
    name: 'Conjurer',
    id: {
      male: 634,
      female: 635,
    },
  },
  {
    name: 'Beastmaster',
    id: {
      male: 636,
      female: 637,
    },
  },
  {
    name: 'Chaos Acolyte',
    id: {
      male: 665,
      female: 664,
    },
  },
  {
    name: 'Death Herald',
    id: {
      male: 667,
      female: 666,
    },
  },
  {
    name: 'Ranger',
    id: {
      male: 684,
      female: 683,
    },
  },
  {
    name: 'Ceremonial Garb',
    id: {
      male: 695,
      female: 694,
    },
  },
  {
    name: 'Puppeteer',
    id: {
      male: 697,
      female: 696,
    },
  },
  {
    name: 'Spirit Caller',
    id: {
      male: 699,
      female: 698,
    },
  },
  {
    name: 'Evoker',
    id: {
      male: 725,
      female: 724,
    },
  },
  {
    name: 'Seaweaver',
    id: {
      male: 733,
      female: 732,
    },
  },
  {
    name: 'Sea Dog',
    id: {
      male: 750,
      female: 749,
    },
  },
  {
    name: 'Royal Pumpkin',
    id: {
      male: 760,
      female: 759,
    },
  },
  {
    name: 'Winter Warden',
    id: {
      male: 853,
      female: 852,
    },
  },
  {
    name: 'Philosopher',
    id: {
      male: 873,
      female: 874,
    },
  },
  {
    name: 'Arena Champion',
    id: {
      male: 884,
      female: 885,
    },
  },
  {
    name: 'Lupine Warden',
    id: {
      male: 899,
      female: 900,
    },
  },
  {
    name: 'Grove Keeper',
    id: {
      male: 908,
      female: 909,
    },
  },
  {
    name: 'Pharaoh',
    id: {
      male: 955,
      female: 956,
    },
  },
  {
    name: 'Trophy Hunter',
    id: {
      male: 957,
      female: 958,
    },
  },
  {
    name: 'Retro Warrior',
    id: {
      male: 962,
      female: 963,
    },
  },
  {
    name: 'Retro Summoner',
    id: {
      male: 964,
      female: 965,
    },
  },
  {
    name: 'Retro Nobleman',
    id: {
      male: 966,
      female: 967,
    },
  },
  {
    name: 'Retro Mage',
    id: {
      male: 968,
      female: 969,
    },
  },
  {
    name: 'Retro Knight',
    id: {
      male: 970,
      female: 971,
    },
  },
  {
    name: 'Retro Hunter',
    id: {
      male: 972,
      female: 973,
    },
  },
  {
    name: 'Retro Citizen',
    id: {
      male: 974,
      female: 975,
    },
  },
  {
    name: 'Herbalist',
    id: {
      male: 1021,
      female: 1020,
    },
  },
  {
    name: 'Sun Priest',
    id: {
      male: 1023,
      female: 1024,
    },
  },
  {
    name: 'Siege Master',
    id: {
      male: 1050,
      female: 1051,
    },
  },
  {
    name: 'Mercenary',
    id: {
      male: 1056,
      female: 1057,
    },
  },
  {
    name: 'Sinister Archer',
    id: {
      male: 1102,
      female: 1103,
    },
  },
  {
    name: 'Pumpkin Mummy',
    id: {
      male: 1127,
      female: 1128,
    },
  },
  {
    name: 'Owl Keeper',
    id: {
      male: 1173,
      female: 1174,
    },
  },
  {
    name: 'Guidon Bearer',
    id: {
      male: 1186,
      female: 1187,
    },
  },
  {
    name: 'Breezy Garb',
    id: {
      male: 1245,
      female: 1246,
    },
  },
  {
    name: 'Herder',
    id: {
      male: 1279,
      female: 1280,
    },
  },
  {
    name: 'Trailblazer',
    id: {
      male: 1292,
      female: 1293,
    },
  },
  {
    name: 'Jouster',
    id: {
      male: 1331,
      female: 1332,
    },
  },
  {
    name: 'Moth Cape',
    id: {
      male: 1338,
      female: 1339,
    },
  },
  {
    name: 'Merry Garb',
    id: {
      male: 1382,
      female: 1383,
    },
  },
  {
    name: 'Rune Master',
    id: {
      male: 1384,
      female: 1385,
    },
  },
  {
    name: 'Forest Warden',
    id: {
      male: 1415,
      female: 1416,
    },
  },
  {
    name: 'Dragon Knight',
    id: {
      male: 1444,
      female: 1445,
    },
  },
  {
    name: 'Arbalester',
    id: {
      male: 1449,
      female: 1450,
    },
  },
]

export const scrapingTokens = lowerCaseKeys(nameableToScrapingTokens(outfits))

export const tokens: string[] = Object.values(scrapingTokens)

export const dictionary = dictionaryFactory(tokens)
