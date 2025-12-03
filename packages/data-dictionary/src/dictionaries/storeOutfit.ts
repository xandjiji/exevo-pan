import {
  cosmeticToPriceMap,
  dictionaryFactory,
  lowerCaseKeys,
  nameableToScrapingTokens,
} from '../utils'

export const outfits: OutfitToken[] = [
  {
    name: 'Entrepreneur',
    id: {
      male: 472,
      female: 471,
    },
    value: 750,
  },
  {
    name: 'Champion',
    id: {
      male: 633,
      female: 632,
    },
    value: 570,
  },
  {
    name: 'Conjurer',
    id: {
      male: 634,
      female: 635,
    },
    value: 720,
  },
  {
    name: 'Beastmaster',
    id: {
      male: 636,
      female: 637,
    },
    value: 870,
  },
  {
    name: 'Chaos Acolyte',
    id: {
      male: 665,
      female: 664,
    },
    value: 900,
  },
  {
    name: 'Death Herald',
    id: {
      male: 667,
      female: 666,
    },
    value: 600,
  },
  {
    name: 'Ranger',
    id: {
      male: 684,
      female: 683,
    },
    value: 750,
  },
  {
    name: 'Ceremonial Garb',
    id: {
      male: 695,
      female: 694,
    },
    value: 750,
  },
  {
    name: 'Puppeteer',
    id: {
      male: 697,
      female: 696,
    },
    value: 870,
  },
  {
    name: 'Spirit Caller',
    id: {
      male: 699,
      female: 698,
    },
    value: 600,
  },
  {
    name: 'Evoker',
    id: {
      male: 725,
      female: 724,
    },
    value: 840,
  },
  {
    name: 'Seaweaver',
    id: {
      male: 733,
      female: 732,
    },
    value: 570,
  },
  {
    name: 'Sea Dog',
    id: {
      male: 750,
      female: 749,
    },
    value: 600,
  },
  {
    name: 'Royal Pumpkin',
    id: {
      male: 760,
      female: 759,
    },
    value: 840,
  },
  {
    name: 'Winter Warden',
    id: {
      male: 853,
      female: 852,
    },
    value: 870,
  },
  {
    name: 'Philosopher',
    id: {
      male: 873,
      female: 874,
    },
    value: 750,
  },
  {
    name: 'Arena Champion',
    id: {
      male: 884,
      female: 885,
    },
    value: 870,
  },
  {
    name: 'Lupine Warden',
    id: {
      male: 899,
      female: 900,
    },
    value: 840,
  },
  {
    name: 'Grove Keeper',
    id: {
      male: 908,
      female: 909,
    },
    value: 870,
  },
  {
    name: 'Pharaoh',
    id: {
      male: 955,
      female: 956,
    },
    value: 750,
  },
  {
    name: 'Trophy Hunter',
    id: {
      male: 957,
      female: 958,
    },
    value: 870,
  },
  {
    name: 'Retro Warrior',
    id: {
      male: 962,
      female: 963,
    },
    value: 870,
  },
  {
    name: 'Retro Summoner',
    id: {
      male: 964,
      female: 965,
    },
    value: 870,
  },
  {
    name: 'Retro Nobleman',
    id: {
      male: 966,
      female: 967,
    },
    value: 870,
  },
  {
    name: 'Retro Mage',
    id: {
      male: 968,
      female: 969,
    },
    value: 870,
  },
  {
    name: 'Retro Knight',
    id: {
      male: 970,
      female: 971,
    },
    value: 870,
  },
  {
    name: 'Retro Hunter',
    id: {
      male: 972,
      female: 973,
    },
    value: 870,
  },
  {
    name: 'Retro Citizen',
    id: {
      male: 974,
      female: 975,
    },
    value: 870,
  },
  {
    name: 'Herbalist',
    id: {
      male: 1021,
      female: 1020,
    },
    value: 750,
  },
  {
    name: 'Sun Priest',
    id: {
      male: 1023,
      female: 1024,
    },
    value: 750,
  },
  {
    name: 'Siege Master',
    id: {
      male: 1050,
      female: 1051,
    },
    value: 600,
  },
  {
    name: 'Mercenary',
    id: {
      male: 1056,
      female: 1057,
    },
    value: 870,
  },
  {
    name: 'Sinister Archer',
    id: {
      male: 1102,
      female: 1103,
    },
    value: 600,
  },
  {
    name: 'Pumpkin Mummy',
    id: {
      male: 1127,
      female: 1128,
    },
    value: 870,
  },
  {
    name: 'Owl Keeper',
    id: {
      male: 1173,
      female: 1174,
    },
    value: 600,
  },
  {
    name: 'Guidon Bearer',
    id: {
      male: 1186,
      female: 1187,
    },
    value: 870,
  },
  {
    name: 'Breezy Garb',
    id: {
      male: 1245,
      female: 1246,
    },
    value: 600,
  },
  {
    name: 'Herder',
    id: {
      male: 1279,
      female: 1280,
    },
    value: 750,
  },
  {
    name: 'Trailblazer',
    id: {
      male: 1292,
      female: 1293,
    },
    value: 600,
  },
  {
    name: 'Jouster',
    id: {
      male: 1331,
      female: 1332,
    },
    value: 750,
  },
  {
    name: 'Moth Cape',
    id: {
      male: 1338,
      female: 1339,
    },
    value: 600,
  },
  {
    name: 'Merry Garb',
    id: {
      male: 1382,
      female: 1383,
    },
    value: 600,
  },
  {
    name: 'Rune Master',
    id: {
      male: 1384,
      female: 1385,
    },
    value: 870,
  },
  {
    name: 'Forest Warden',
    id: {
      male: 1415,
      female: 1416,
    },
    value: 750,
  },
  {
    name: 'Dragon Knight',
    id: {
      male: 1444,
      female: 1445,
    },
    value: 870,
  },
  {
    name: 'Arbalester',
    id: {
      male: 1449,
      female: 1450,
    },
    value: 600,
  },
  {
    name: 'Ghost Blade',
    id: {
      male: 1489,
      female: 1490,
    },
    value: 600,
  },
  {
    name: 'Nordic Chieftain',
    id: {
      male: 1500,
      female: 1501,
    },
    value: 750,
  },
  {
    name: 'Fencer',
    id: {
      male: 1575,
      female: 1576,
    },
    value: 750,
  },
  {
    name: 'Shadowlotus Disciple',
    id: {
      male: 1581,
      female: 1582,
    },
    value: 600,
  },
  {
    name: 'Frost Tracer',
    id: {
      male: 1612,
      female: 1613,
    },
    value: 750,
  },
  {
    name: 'Armoured Archer',
    id: {
      male: 1618,
      female: 1619,
    },
    value: 600,
  },
  {
    name: 'Veteran Paladin',
    id: {
      male: 1640,
      female: 1641,
    },
    value: 750,
  },
  {
    name: 'Void Master',
    id: {
      male: 1642,
      female: 1643,
    },
    value: 750,
  },
  {
    name: 'Darklight Evoker',
    id: {
      male: 1675,
      female: 1676,
    },
    value: 500,
  },
  {
    name: 'Flamefury Mage',
    id: {
      male: 1680,
      female: 1681,
    },
    value: 800,
  },
  {
    name: 'Doom Knight',
    id: {
      male: 1713,
      female: 1714,
    },
    value: 600,
  },
  {
    name: 'Celestial Avenger',
    id: {
      male: 1725,
      female: 1726,
    },
    value: 870,
  },
  {
    name: 'Blade Dancer',
    id: {
      male: 1745,
      female: 1746,
    },
    value: 750,
  },
  {
    name: 'Beekeeper',
    id: {
      male: 1776,
      female: 1777,
    },
    value: 870,
  },
  {
    name: 'Field Surgeon',
    id: {
      male: 1814,
      female: 1815,
    },
    value: 870,
  },
  {
    name: 'Winged Druid',
    id: {
      male: 1831,
      female: 1832,
    },
    value: 870,
  },
  {
    name: 'Martial Artist',
    id: {
      male: 1837,
      female: 1838,
    },
    value: 870,
  },
  {
    name: 'Bat Knight',
    id: {
      male: 1874,
      female: 1875,
    },
    value: 870,
  },
  {
    name: 'Necromancer',
    id: {
      male: 1845,
      female: 1846,
    },
    value: 870,
  },
]

export const priceMap = cosmeticToPriceMap(outfits)

export const scrapingTokens = lowerCaseKeys(nameableToScrapingTokens(outfits))

export const tokens: string[] = Object.values(scrapingTokens)

export const dictionary = dictionaryFactory(tokens)
