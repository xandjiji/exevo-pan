import {
  nameableToScrapingTokens,
  lowerCaseKeys,
  dictionaryFactory,
} from '../utils'

const mounts: MountToken[] = [
  {
    name: 'Armoured War Horse',
    id: 426,
  },
  {
    name: 'Shadow Draptor',
    id: 427,
  },
  {
    name: 'Crimson Ray',
    id: 521,
  },
  {
    name: 'Steelbeak',
    id: 522,
  },
  {
    name: 'Tombstinger',
    id: 546,
  },
  {
    name: 'Platesaurian',
    id: 547,
  },
  {
    name: 'Desert King',
    id: 572,
  },
  {
    name: 'Azudocus',
    id: 621,
  },
  {
    name: 'Carpacosaurus',
    id: 622,
  },
  {
    name: 'Death Crawler',
    id: 624,
  },
  {
    name: 'Flamesteed',
    id: 626,
  },
  {
    name: 'Jade Lion',
    id: 627,
  },
  {
    name: 'Jade Pincer',
    id: 628,
  },
  {
    name: 'Nethersteed',
    id: 629,
  },
  {
    name: 'Tempest',
    id: 630,
  },
  {
    name: 'Winter King',
    id: 631,
  },
  {
    name: 'Doombringer',
    id: 644,
  },
  {
    name: 'Woodland Prince',
    id: 647,
  },
  {
    name: 'Hailstorm Fury',
    id: 648,
  },
  {
    name: 'Siegebreaker',
    id: 649,
  },
  {
    name: 'Poisonbane',
    id: 650,
  },
  {
    name: 'Blackpelt',
    id: 651,
  },
  {
    name: 'Golden Dragonfly',
    id: 669,
  },
  {
    name: 'Steel Bee',
    id: 670,
  },
  {
    name: 'Copper Fly',
    id: 671,
  },
  {
    name: 'Tundra Rambler',
    id: 672,
  },
  {
    name: 'Highland Yak',
    id: 673,
  },
  {
    name: 'Glacier Vagabond',
    id: 674,
  },
  {
    name: 'Shadow Hart',
    id: 685,
  },
  {
    name: 'Black Stag',
    id: 686,
  },
  {
    name: 'Emperor Deer',
    id: 687,
  },
  {
    name: 'Flying Divan',
    id: 688,
  },
  {
    name: 'Magic Carpet',
    id: 689,
  },
  {
    name: 'Floating Kashmir',
    id: 690,
  },
  {
    name: 'Ringtail Waccoon',
    id: 691,
  },
  {
    name: 'Night Waccoon',
    id: 692,
  },
  {
    name: 'Emerald Waccoon',
    id: 693,
  },
  {
    name: 'Flitterkatzen',
    id: 726,
  },
  {
    name: 'Venompaw',
    id: 727,
  },
  {
    name: 'Batcat',
    id: 728,
  },
  {
    name: 'Sea Devil',
    id: 734,
  },
  {
    name: 'Coralripper',
    id: 735,
  },
  {
    name: 'Plumfish',
    id: 736,
  },
  {
    name: 'Gorongra',
    id: 738,
  },
  {
    name: 'Noctungra',
    id: 739,
  },
  {
    name: 'Silverneck',
    id: 740,
  },
  {
    name: 'Slagsnare',
    id: 761,
  },
  {
    name: 'Nightstinger',
    id: 762,
  },
  {
    name: 'Razorcreep',
    id: 763,
  },
  {
    name: 'Nightdweller',
    id: 849,
  },
  {
    name: 'Frostflare',
    id: 850,
  },
  {
    name: 'Cinderhoof',
    id: 851,
  },
  {
    name: 'Mouldpincer',
    id: 868,
  },
  {
    name: 'Bloodcurl',
    id: 869,
  },
  {
    name: 'Leafscuttler',
    id: 870,
  },
  {
    name: 'Swamp Snapper',
    id: 886,
  },
  {
    name: 'Mould Shell',
    id: 887,
  },
  {
    name: 'Reed Lurker',
    id: 888,
  },
  {
    name: 'Ivory Fang',
    id: 901,
  },
  {
    name: 'Shadow Claw',
    id: 902,
  },
  {
    name: 'Snow Pelt',
    id: 903,
  },
  {
    name: 'Jackalope',
    id: 905,
  },
  {
    name: 'Wolpertinger',
    id: 906,
  },
  {
    name: 'Dreadhare',
    id: 907,
  },
  {
    name: 'Gold Sphinx',
    id: 950,
  },
  {
    name: 'Emerald Sphinx',
    id: 951,
  },
  {
    name: 'Shadow Sphinx',
    id: 952,
  },
  {
    name: 'Jungle Saurian',
    id: 959,
  },
  {
    name: 'Ember Saurian',
    id: 960,
  },
  {
    name: 'Lagoon Saurian',
    id: 961,
  },
  {
    name: 'Blazing Unicorn',
    id: 1017,
  },
  {
    name: 'Arctic Unicorn',
    id: 1018,
  },
  {
    name: 'Prismatic Unicorn',
    id: 1019,
  },
  {
    name: 'Cranium Spider',
    id: 1025,
  },
  {
    name: 'Cave Tarantula',
    id: 1026,
  },
  {
    name: 'Gloom Widow',
    id: 1027,
  },
  {
    name: 'Marsh Toad',
    id: 1052,
  },
  {
    name: 'Sanguine Frog',
    id: 1053,
  },
  {
    name: 'Toxic Toad',
    id: 1054,
  },
  {
    name: 'Ebony Tiger',
    id: 1091,
  },
  {
    name: 'Feral Tiger',
    id: 1092,
  },
  {
    name: 'Jungle Tiger',
    id: 1093,
  },
  {
    name: 'Tawny Owl',
    id: 1104,
  },
  {
    name: 'Snowy Owl',
    id: 1105,
  },
  {
    name: 'Boreal Owl',
    id: 1106,
  },
  {
    name: 'Festive Snowman',
    id: 1167,
  },
  {
    name: 'Muffled Snowman',
    id: 1168,
  },
  {
    name: 'Caped Snowman',
    id: 1169,
  },
  {
    name: 'Rabbit Rickshaw',
    id: 1179,
  },
  {
    name: 'Bunny Dray',
    id: 1180,
  },
  {
    name: 'Cony Cart',
    id: 1181,
  },
  {
    name: 'River Crocovile',
    id: 1183,
  },
  {
    name: 'Swamp Crocovile',
    id: 1184,
  },
  {
    name: 'Nightmarish Crocovile',
    id: 1185,
  },
  {
    name: 'Jousting Eagle',
    id: 1208,
  },
  {
    name: 'Cerberus Champion',
    id: 1209,
  },
  {
    name: 'Battle Badger',
    id: 1247,
  },
  {
    name: 'Ether Badger',
    id: 1248,
  },
  {
    name: 'Zaoan Badger',
    id: 1249,
  },
  {
    name: 'Floating Sage',
    id: 1264,
  },
  {
    name: 'Floating Scholar',
    id: 1265,
  },
  {
    name: 'Floating Augur',
    id: 1266,
  },
  {
    name: 'Snow Strider',
    id: 1284,
  },
  {
    name: 'Dusk Pryer',
    id: 1285,
  },
  {
    name: 'Dawn Strayer',
    id: 1286,
  },
  {
    name: 'Benevolent Savanna Ostrich',
    id: 1309,
  },
  {
    name: 'Benevolent Coral Rhea',
    id: 1310,
  },
  {
    name: 'Benevolent Eventide Nandu',
    id: 1311,
  },
  {
    name: 'Savanna Ostrich',
    id: 1324,
  },
  {
    name: 'Coral Rhea',
    id: 1325,
  },
  {
    name: 'Eventide Nandu',
    id: 1326,
  },
  {
    name: 'Voracious Hyaena',
    id: 1333,
  },
  {
    name: 'Cunning Hyaena',
    id: 1334,
  },
  {
    name: 'Scruffy Hyaena',
    id: 1335,
  },
  {
    name: 'Merry Mammoth',
    id: 1379,
  },
  {
    name: 'Holiday Mammoth',
    id: 1380,
  },
  {
    name: 'Festive Mammoth',
    id: 1381,
  },
  {
    name: 'Void Watcher',
    id: 1389,
  },
  {
    name: 'Rune Watcher',
    id: 1390,
  },
  {
    name: 'Rift Watcher',
    id: 1391,
  },
  {
    name: 'Hyacinth',
    id: 1439,
  },
  {
    name: 'Peony',
    id: 1440,
  },
  {
    name: 'Dandelion',
    id: 1441,
  },
  {
    name: 'Rustwurm',
    id: 1446,
  },
  {
    name: 'Bogwurm',
    id: 1447,
  },
  {
    name: 'Gloomwurm',
    id: 1448,
  },
  {
    name: 'Emerald Raven',
    id: 1453,
  },
  {
    name: 'Mystic Raven',
    id: 1454,
  },
  {
    name: 'Radiant Raven',
    id: 1455,
  },
]

export const scrapingTokens = lowerCaseKeys(nameableToScrapingTokens(mounts))

export const tokens: string[] = Object.values(scrapingTokens)

export const dictionary = dictionaryFactory(tokens)
