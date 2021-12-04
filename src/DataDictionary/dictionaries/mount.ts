import {
  outfitsToScrapingTokens,
  lowerCaseKeys,
  dictionaryFactory,
} from '../utils'
import { MountToken } from '../types'

const mounts: MountToken[] = [
  {
    name: 'Widow Queen',
    id: 368,
  },
  {
    name: 'Racing Bird',
    id: 369,
  },
  {
    name: 'War Bear',
    id: 370,
  },
  {
    name: 'Black Sheep',
    id: 371,
  },
  {
    name: 'Midnight Panther',
    id: 372,
  },
  {
    name: 'Draptor',
    id: 373,
  },
  {
    name: 'Titanica',
    id: 374,
  },
  {
    name: 'Tin Lizzard',
    id: 375,
  },
  {
    name: 'Blazebringer',
    id: 376,
  },
  {
    name: 'Rapid Boar',
    id: 377,
  },
  {
    name: 'Stampor',
    id: 378,
  },
  {
    name: 'Undead Cavebear',
    id: 379,
  },
  {
    name: 'Donkey',
    id: 387,
  },
  {
    name: 'Tiger Slug',
    id: 388,
  },
  {
    name: 'Uniwheel',
    id: 389,
  },
  {
    name: 'Crystal Wolf',
    id: 390,
  },
  {
    name: 'War Horse',
    id: 392,
  },
  {
    name: 'Kingly Deer',
    id: 401,
  },
  {
    name: 'Tamed Panda',
    id: 402,
  },
  {
    name: 'Dromedary',
    id: 405,
  },
  {
    name: 'Scorpion King',
    id: 406,
  },
  {
    name: 'Lady Bug',
    id: 447,
  },
  {
    name: 'Manta Ray',
    id: 450,
  },
  {
    name: 'Ironblight',
    id: 502,
  },
  {
    name: 'Magma Crawler',
    id: 503,
  },
  {
    name: 'Dragonling',
    id: 506,
  },
  {
    name: 'Gnarlhound',
    id: 515,
  },
  {
    name: 'Water Buffalo',
    id: 526,
  },
  {
    name: 'Ursagrodon',
    id: 548,
  },
  {
    name: 'The Hellgrip',
    id: 559,
  },
  {
    name: 'Noble Lion',
    id: 571,
  },
  {
    name: 'Shock Head',
    id: 580,
  },
  {
    name: 'Walker',
    id: 606,
  },
  {
    name: 'Glooth Glider',
    id: 682,
  },
  {
    name: 'Rift Runner',
    id: 848,
  },
  {
    name: 'Sparkion',
    id: 883,
  },
  {
    name: 'Neon Sparkid',
    id: 889,
  },
  {
    name: 'Vortexion',
    id: 890,
  },
  {
    name: 'Stone Rhino',
    id: 937,
  },
  {
    name: 'Mole',
    id: 1049,
  },
  {
    name: 'Fleeting Knowledge',
    id: 1101,
  },
  {
    name: 'Lacewing Moth',
    id: 1150,
  },
  {
    name: 'Hibernal Moth',
    id: 1151,
  },
  {
    name: 'Cold Percht Sleigh',
    id: 1163,
  },
  {
    name: 'Bright Percht Sleigh',
    id: 1164,
  },
  {
    name: 'Dark Percht Sleigh',
    id: 1165,
  },
  {
    name: 'Gryphon',
    id: 1191,
  },
  {
    name: 'Cold Percht Sleigh Variant',
    id: 1229,
  },
  {
    name: 'Bright Percht Sleigh Variant',
    id: 1230,
  },
  {
    name: 'Dark Percht Sleigh Variant',
    id: 1231,
  },
  {
    name: 'Finished Cold Percht Sleigh',
    id: 1232,
  },
  {
    name: 'Finished Bright Percht Sleigh',
    id: 1233,
  },
  {
    name: 'Finished Dark Percht Sleigh',
    id: 1234,
  },
  {
    name: 'Blue Rolling Barrel',
    id: 1257,
  },
  {
    name: 'Red Rolling Barrel',
    id: 1258,
  },
  {
    name: 'Green Rolling Barrel',
    id: 1259,
  },
  {
    name: 'Haze',
    id: 1269,
  },
  {
    name: 'Antelope',
    id: 1281,
  },
  {
    name: 'Phantasmal Jade',
    id: 1321,
  },
  {
    name: 'White Lion',
    id: 1336,
  },
  {
    name: 'Krakoloss',
    id: 1363,
  },
  {
    name: 'Phant',
    id: 1417,
  },
  {
    name: 'Shellodon',
    id: 1430,
  },
  {
    name: 'Singeing Steed',
    id: 1431,
  },
]

export const scrapingTokens = lowerCaseKeys(outfitsToScrapingTokens(mounts))

export const tokens = Object.values(scrapingTokens)

export const dictionary = dictionaryFactory(tokens)
