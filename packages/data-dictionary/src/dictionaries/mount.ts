import {
  dictionaryFactory,
  lowerCaseKeys,
  nameableToScrapingTokens,
} from '../utils'

const mounts: MountToken[] = [
  {
    name: 'Widow Queen',
    id: 368,
    value: 0,
  },
  {
    name: 'Racing Bird',
    id: 369,
    value: 0,
  },
  {
    name: 'War Bear',
    id: 370,
    value: 0,
  },
  {
    name: 'Black Sheep',
    id: 371,
    value: 0,
  },
  {
    name: 'Midnight Panther',
    id: 372,
    value: 0,
  },
  {
    name: 'Draptor',
    id: 373,
    value: 0,
  },
  {
    name: 'Titanica',
    id: 374,
    value: 0,
  },
  {
    name: 'Tin Lizzard',
    id: 375,
    value: 0,
  },
  {
    name: 'Blazebringer',
    id: 376,
    value: 0,
  },
  {
    name: 'Rapid Boar',
    id: 377,
    value: 0,
  },
  {
    name: 'Stampor',
    id: 378,
    value: 0,
  },
  {
    name: 'Undead Cavebear',
    id: 379,
    value: 0,
  },
  {
    name: 'Donkey',
    id: 387,
    value: 0,
  },
  {
    name: 'Tiger Slug',
    id: 388,
    value: 0,
  },
  {
    name: 'Uniwheel',
    id: 389,
    value: 0,
  },
  {
    name: 'Crystal Wolf',
    id: 390,
    value: 0,
  },
  {
    name: 'War Horse',
    id: 392,
    value: 0,
  },
  {
    name: 'Kingly Deer',
    id: 401,
    value: 0,
  },
  {
    name: 'Tamed Panda',
    id: 402,
    value: 0,
  },
  {
    name: 'Dromedary',
    id: 405,
    value: 0,
  },
  {
    name: 'Scorpion King',
    id: 406,
    value: 0,
  },
  {
    name: 'Lady Bug',
    id: 447,
    value: 0,
  },
  {
    name: 'Manta Ray',
    id: 450,
    value: 0,
  },
  {
    name: 'Ironblight',
    id: 502,
    value: 0,
  },
  {
    name: 'Magma Crawler',
    id: 503,
    value: 0,
  },
  {
    name: 'Dragonling',
    id: 506,
    value: 0,
  },
  {
    name: 'Gnarlhound',
    id: 515,
    value: 0,
  },
  {
    name: 'Water Buffalo',
    id: 526,
    value: 0,
  },
  {
    name: 'Ursagrodon',
    id: 548,
    value: 0,
  },
  {
    name: 'The Hellgrip',
    id: 559,
    value: 0,
  },
  {
    name: 'Noble Lion',
    id: 571,
    value: 0,
  },
  {
    name: 'Shock Head',
    id: 580,
    value: 0,
  },
  {
    name: 'Walker',
    id: 606,
    value: 0,
  },
  {
    name: 'Glooth Glider',
    id: 682,
    value: 0,
  },
  {
    name: 'Rift Runner',
    id: 848,
    value: 0,
  },
  {
    name: 'Sparkion',
    id: 883,
    value: 0,
  },
  {
    name: 'Neon Sparkid',
    id: 889,
    value: 0,
  },
  {
    name: 'Vortexion',
    id: 890,
    value: 0,
  },
  {
    name: 'Stone Rhino',
    id: 937,
    value: 0,
  },
  {
    name: 'Mole',
    id: 1049,
    value: 0,
  },
  {
    name: 'Fleeting Knowledge',
    id: 1101,
    value: 0,
  },
  {
    name: 'Lacewing Moth',
    id: 1150,
    value: 0,
  },
  {
    name: 'Hibernal Moth',
    id: 1151,
    value: 0,
  },
  {
    name: 'Cold Percht Sleigh',
    id: 1163,
    value: 0,
  },
  {
    name: 'Bright Percht Sleigh',
    id: 1164,
    value: 0,
  },
  {
    name: 'Dark Percht Sleigh',
    id: 1165,
    value: 0,
  },
  {
    name: 'Gryphon',
    id: 1191,
    value: 0,
  },
  {
    name: 'Cold Percht Sleigh Variant',
    id: 1229,
    value: 0,
  },
  {
    name: 'Bright Percht Sleigh Variant',
    id: 1230,
    value: 0,
  },
  {
    name: 'Dark Percht Sleigh Variant',
    id: 1231,
    value: 0,
  },
  {
    name: 'Finished Cold Percht Sleigh',
    id: 1232,
    value: 0,
  },
  {
    name: 'Finished Bright Percht Sleigh',
    id: 1233,
    value: 0,
  },
  {
    name: 'Finished Dark Percht Sleigh',
    id: 1234,
    value: 0,
  },
  {
    name: 'Blue Rolling Barrel',
    id: 1257,
    value: 0,
  },
  {
    name: 'Red Rolling Barrel',
    id: 1258,
    value: 0,
  },
  {
    name: 'Green Rolling Barrel',
    id: 1259,
    value: 0,
  },
  {
    name: 'Haze',
    id: 1269,
    value: 0,
  },
  {
    name: 'Antelope',
    id: 1281,
    value: 0,
  },
  {
    name: 'Phantasmal Jade',
    id: 1321,
    value: 0,
  },
  {
    name: 'White Lion',
    id: 1336,
    value: 0,
  },
  {
    name: 'Krakoloss',
    id: 1363,
    value: 0,
  },
  {
    name: 'Phant',
    id: 1417,
    value: 0,
  },
  {
    name: 'Shellodon',
    id: 1430,
    value: 0,
  },
  {
    name: 'Singeing Steed',
    id: 1431,
    value: 0,
  },
  {
    name: 'Gloothomotive',
    id: 1459,
    value: 0,
  },
  {
    name: 'Giant Beaver',
    id: 1536,
    value: 0,
  },
  {
    name: 'Ripptor',
    id: 1577,
    value: 0,
  },
  {
    name: 'Mutated Abomination',
    id: 1599,
    value: 0,
  },
  {
    name: 'Foxmouse',
    id: 1632,
    value: 0,
  },
  {
    name: 'Spirit of Purity',
    id: 1682,
    value: 0,
  },
]

export const scrapingTokens = lowerCaseKeys(nameableToScrapingTokens(mounts))

export const tokens: string[] = Object.values(scrapingTokens)

export const dictionary = dictionaryFactory(tokens)
