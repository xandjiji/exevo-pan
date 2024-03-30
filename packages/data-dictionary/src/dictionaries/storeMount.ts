import {
  cosmeticToPriceMap,
  dictionaryFactory,
  lowerCaseKeys,
  nameableToScrapingTokens,
} from '../utils'

const mounts: MountToken[] = [
  {
    name: 'Armoured War Horse',
    id: 426,
    value: 870,
  },
  {
    name: 'Shadow Draptor',
    id: 427,
    value: 870,
  },
  {
    name: 'Crimson Ray',
    id: 521,
    value: 870,
  },
  {
    name: 'Steelbeak',
    id: 522,
    value: 870,
  },
  {
    name: 'Tombstinger',
    id: 546,
    value: 600,
  },
  {
    name: 'Platesaurian',
    id: 547,
    value: 750,
  },
  {
    name: 'Desert King',
    id: 572,
    value: 450,
  },
  {
    name: 'Azudocus',
    id: 621,
    value: 750,
  },
  {
    name: 'Carpacosaurus',
    id: 622,
    value: 750,
  },
  {
    name: 'Death Crawler',
    id: 624,
    value: 600,
  },
  {
    name: 'Flamesteed',
    id: 626,
    value: 900,
  },
  {
    name: 'Jade Lion',
    id: 627,
    value: 450,
  },
  {
    name: 'Jade Pincer',
    id: 628,
    value: 600,
  },
  {
    name: 'Nethersteed',
    id: 629,
    value: 900,
  },
  {
    name: 'Tempest',
    id: 630,
    value: 900,
  },
  {
    name: 'Winter King',
    id: 631,
    value: 450,
  },
  {
    name: 'Doombringer',
    id: 644,
    value: 780,
  },
  {
    name: 'Woodland Prince',
    id: 647,
    value: 780,
  },
  {
    name: 'Hailstorm Fury',
    id: 648,
    value: 780,
  },
  {
    name: 'Siegebreaker',
    id: 649,
    value: 690,
  },
  {
    name: 'Poisonbane',
    id: 650,
    value: 690,
  },
  {
    name: 'Blackpelt',
    id: 651,
    value: 690,
  },
  {
    name: 'Golden Dragonfly',
    id: 669,
    value: 600,
  },
  {
    name: 'Steel Bee',
    id: 670,
    value: 600,
  },
  {
    name: 'Copper Fly',
    id: 671,
    value: 600,
  },
  {
    name: 'Tundra Rambler',
    id: 672,
    value: 750,
  },
  {
    name: 'Highland Yak',
    id: 673,
    value: 750,
  },
  {
    name: 'Glacier Vagabond',
    id: 674,
    value: 750,
  },
  {
    name: 'Shadow Hart',
    id: 685,
    value: 660,
  },
  {
    name: 'Black Stag',
    id: 686,
    value: 660,
  },
  {
    name: 'Emperor Deer',
    id: 687,
    value: 660,
  },
  {
    name: 'Flying Divan',
    id: 688,
    value: 900,
  },
  {
    name: 'Magic Carpet',
    id: 689,
    value: 900,
  },
  {
    name: 'Floating Kashmir',
    id: 690,
    value: 900,
  },
  {
    name: 'Ringtail Waccoon',
    id: 691,
    value: 750,
  },
  {
    name: 'Night Waccoon',
    id: 692,
    value: 750,
  },
  {
    name: 'Emerald Waccoon',
    id: 693,
    value: 750,
  },
  {
    name: 'Flitterkatzen',
    id: 726,
    value: 870,
  },
  {
    name: 'Venompaw',
    id: 727,
    value: 870,
  },
  {
    name: 'Batcat',
    id: 728,
    value: 870,
  },
  {
    name: 'Sea Devil',
    id: 734,
    value: 570,
  },
  {
    name: 'Coralripper',
    id: 735,
    value: 570,
  },
  {
    name: 'Plumfish',
    id: 736,
    value: 570,
  },
  {
    name: 'Gorongra',
    id: 738,
    value: 720,
  },
  {
    name: 'Noctungra',
    id: 739,
    value: 720,
  },
  {
    name: 'Silverneck',
    id: 740,
    value: 720,
  },
  {
    name: 'Slagsnare',
    id: 761,
    value: 780,
  },
  {
    name: 'Nightstinger',
    id: 762,
    value: 780,
  },
  {
    name: 'Razorcreep',
    id: 763,
    value: 780,
  },
  {
    name: 'Nightdweller',
    id: 849,
    value: 870,
  },
  {
    name: 'Frostflare',
    id: 850,
    value: 870,
  },
  {
    name: 'Cinderhoof',
    id: 851,
    value: 870,
  },
  {
    name: 'Mouldpincer',
    id: 868,
    value: 750,
  },
  {
    name: 'Bloodcurl',
    id: 869,
    value: 750,
  },
  {
    name: 'Leafscuttler',
    id: 870,
    value: 750,
  },
  {
    name: 'Swamp Snapper',
    id: 886,
    value: 690,
  },
  {
    name: 'Mould Shell',
    id: 887,
    value: 690,
  },
  {
    name: 'Reed Lurker',
    id: 888,
    value: 690,
  },
  {
    name: 'Ivory Fang',
    id: 901,
    value: 750,
  },
  {
    name: 'Shadow Claw',
    id: 902,
    value: 750,
  },
  {
    name: 'Snow Pelt',
    id: 903,
    value: 750,
  },
  {
    name: 'Jackalope',
    id: 905,
    value: 870,
  },
  {
    name: 'Wolpertinger',
    id: 906,
    value: 870,
  },
  {
    name: 'Dreadhare',
    id: 907,
    value: 870,
  },
  {
    name: 'Gold Sphinx',
    id: 950,
    value: 750,
  },
  {
    name: 'Emerald Sphinx',
    id: 951,
    value: 750,
  },
  {
    name: 'Shadow Sphinx',
    id: 952,
    value: 750,
  },
  {
    name: 'Jungle Saurian',
    id: 959,
    value: 750,
  },
  {
    name: 'Ember Saurian',
    id: 960,
    value: 750,
  },
  {
    name: 'Lagoon Saurian',
    id: 961,
    value: 750,
  },
  {
    name: 'Blazing Unicorn',
    id: 1017,
    value: 870,
  },
  {
    name: 'Arctic Unicorn',
    id: 1018,
    value: 870,
  },
  {
    name: 'Prismatic Unicorn',
    id: 1019,
    value: 870,
  },
  {
    name: 'Cranium Spider',
    id: 1025,
    value: 690,
  },
  {
    name: 'Cave Tarantula',
    id: 1026,
    value: 690,
  },
  {
    name: 'Gloom Widow',
    id: 1027,
    value: 690,
  },
  {
    name: 'Marsh Toad',
    id: 1052,
    value: 690,
  },
  {
    name: 'Sanguine Frog',
    id: 1053,
    value: 690,
  },
  {
    name: 'Toxic Toad',
    id: 1054,
    value: 690,
  },
  {
    name: 'Ebony Tiger',
    id: 1091,
    value: 750,
  },
  {
    name: 'Feral Tiger',
    id: 1092,
    value: 750,
  },
  {
    name: 'Jungle Tiger',
    id: 1093,
    value: 750,
  },
  {
    name: 'Tawny Owl',
    id: 1104,
    value: 870,
  },
  {
    name: 'Snowy Owl',
    id: 1105,
    value: 870,
  },
  {
    name: 'Boreal Owl',
    id: 1106,
    value: 870,
  },
  {
    name: 'Festive Snowman',
    id: 1167,
    value: 900,
  },
  {
    name: 'Muffled Snowman',
    id: 1168,
    value: 900,
  },
  {
    name: 'Caped Snowman',
    id: 1169,
    value: 900,
  },
  {
    name: 'Rabbit Rickshaw',
    id: 1179,
    value: 870,
  },
  {
    name: 'Bunny Dray',
    id: 1180,
    value: 870,
  },
  {
    name: 'Cony Cart',
    id: 1181,
    value: 870,
  },
  {
    name: 'River Crocovile',
    id: 1183,
    value: 750,
  },
  {
    name: 'Swamp Crocovile',
    id: 1184,
    value: 750,
  },
  {
    name: 'Nightmarish Crocovile',
    id: 1185,
    value: 750,
  },
  {
    name: 'Jousting Eagle',
    id: 1208,
    value: 750,
  },
  {
    name: 'Cerberus Champion',
    id: 1209,
    value: 750,
  },
  {
    name: 'Battle Badger',
    id: 1247,
    value: 690,
  },
  {
    name: 'Ether Badger',
    id: 1248,
    value: 690,
  },
  {
    name: 'Zaoan Badger',
    id: 1249,
    value: 690,
  },
  {
    name: 'Floating Sage',
    id: 1264,
    value: 870,
  },
  {
    name: 'Floating Scholar',
    id: 1265,
    value: 870,
  },
  {
    name: 'Floating Augur',
    id: 1266,
    value: 870,
  },
  {
    name: 'Snow Strider',
    id: 1284,
    value: 870,
  },
  {
    name: 'Dusk Pryer',
    id: 1285,
    value: 870,
  },
  {
    name: 'Dawn Strayer',
    id: 1286,
    value: 870,
  },
  {
    name: 'Benevolent Savanna Ostrich',
    id: 1309,
    value: 500,
  },
  {
    name: 'Benevolent Coral Rhea',
    id: 1310,
    value: 500,
  },
  {
    name: 'Benevolent Eventide Nandu',
    id: 1311,
    value: 500,
  },
  {
    name: 'Savanna Ostrich',
    id: 1324,
    value: 500,
  },
  {
    name: 'Coral Rhea',
    id: 1325,
    value: 500,
  },
  {
    name: 'Eventide Nandu',
    id: 1326,
    value: 500,
  },
  {
    name: 'Voracious Hyaena',
    id: 1333,
    value: 750,
  },
  {
    name: 'Cunning Hyaena',
    id: 1334,
    value: 750,
  },
  {
    name: 'Scruffy Hyaena',
    id: 1335,
    value: 750,
  },
  {
    name: 'Merry Mammoth',
    id: 1379,
    value: 750,
  },
  {
    name: 'Holiday Mammoth',
    id: 1380,
    value: 750,
  },
  {
    name: 'Festive Mammoth',
    id: 1381,
    value: 750,
  },
  {
    name: 'Void Watcher',
    id: 1389,
    value: 870,
  },
  {
    name: 'Rune Watcher',
    id: 1390,
    value: 870,
  },
  {
    name: 'Rift Watcher',
    id: 1391,
    value: 870,
  },
  {
    name: 'Hyacinth',
    id: 1439,
    value: 750,
  },
  {
    name: 'Peony',
    id: 1440,
    value: 750,
  },
  {
    name: 'Dandelion',
    id: 1441,
    value: 750,
  },
  {
    name: 'Rustwurm',
    id: 1446,
    value: 870,
  },
  {
    name: 'Bogwurm',
    id: 1447,
    value: 870,
  },
  {
    name: 'Gloomwurm',
    id: 1448,
    value: 870,
  },
  {
    name: 'Emerald Raven',
    id: 1453,
    value: 690,
  },
  {
    name: 'Mystic Raven',
    id: 1454,
    value: 690,
  },
  {
    name: 'Radiant Raven',
    id: 1455,
    value: 690,
  },
  {
    name: 'Topaz Shrine',
    id: 1491,
    value: 690,
  },
  {
    name: 'Jade Shrine',
    id: 1492,
    value: 690,
  },
  {
    name: 'Obsidian Shrine',
    id: 1493,
    value: 690,
  },
  {
    name: 'Poppy Ibex',
    id: 1526,
    value: 750,
  },
  {
    name: 'Mint Ibex',
    id: 1527,
    value: 750,
  },
  {
    name: 'Cinnamon Ibex',
    id: 1528,
    value: 750,
  },
  {
    name: 'Parade Horse',
    id: 1578,
    value: 870,
  },
  {
    name: 'Jousting Horse',
    id: 1579,
    value: 870,
  },
  {
    name: 'Tourney Horse',
    id: 1580,
    value: 870,
  },
  {
    name: 'Tangerine Flecked Koi',
    id: 1608,
    value: 750,
  },
  {
    name: 'Brass Speckled Koi',
    id: 1609,
    value: 750,
  },
  {
    name: 'Ink Spotted Koi',
    id: 1610,
    value: 750,
  },
  {
    name: 'Frostbringer',
    id: 1615,
    value: 750,
  },
  {
    name: 'Winterstride',
    id: 1616,
    value: 750,
  },
  {
    name: 'Icebreacher',
    id: 1617,
    value: 750,
  },
  {
    name: 'Boisterous Bull',
    id: 1672,
    value: 690,
  },
  {
    name: 'Surly Steer',
    id: 1673,
    value: 690,
  },
  {
    name: 'Obstinate Ox',
    id: 1674,
    value: 690,
  },
  {
    name: 'Darkfire Devourer',
    id: 1677,
    value: 500,
  },
  {
    name: 'Doom Skull',
    id: 1685,
    value: 750,
  },
  {
    name: 'Magma Skull',
    id: 1686,
    value: 750,
  },
  {
    name: 'Corpsefire Skull',
    id: 1687,
    value: 750,
  },
  {
    name: 'Gorgon Hydra',
    id: 1724,
    value: 870,
  },
  {
    name: 'Dawnbringer Pegasus',
    id: 1727,
    value: 750,
  },
  {
    name: 'Wrathfire Pegasus',
    id: 1728,
    value: 750,
  },
  {
    name: 'Skybreaker Pegasus',
    id: 1729,
    value: 750,
  },
]

export const priceMap = cosmeticToPriceMap(mounts)

export const scrapingTokens = lowerCaseKeys(nameableToScrapingTokens(mounts))

export const tokens: string[] = Object.values(scrapingTokens)

export const dictionary = dictionaryFactory(tokens)
