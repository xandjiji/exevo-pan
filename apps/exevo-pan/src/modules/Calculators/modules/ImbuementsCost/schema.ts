import { loadRawSrc } from 'utils'
import { RecipeSchema } from './types'

const vexclawtalonSrc = loadRawSrc('/assets/vexclawTalon.png')
const sabretoothSrc = loadRawSrc('/assets/sabretooth.png')
const protectivecharmSrc = loadRawSrc('/assets/protectiveCharm.png')
const grimeleechSrc = loadRawSrc('/assets/grimeleech.png')
const silencerclawsSrc = loadRawSrc('/assets/silencerClaws.png')
const ropebeltSrc = loadRawSrc('/assets/ropeBelt.png')
const deadbrainSrc = loadRawSrc('/assets/deadBrain.png')
const bloodypincersSrc = loadRawSrc('/assets/bloodyPincers.png')
const vampireteethSrc = loadRawSrc('/assets/vampireTeeth.png')

export const tierOptions: Option[] = [
  { name: 'Powerful (III)', value: '3' },
  { name: 'Intricate (II)', value: '2' },
  { name: 'Basic (I)', value: '1' },
]

// eslint-disable-next-line no-shadow
export enum RecordKeys {
  goldToken = 'goldToken',
  tier = 'tier',
}

export const DEFAULT_STATE = {
  [RecordKeys.goldToken]: 20000,
  [RecordKeys.tier]: 3,
}

export const RECIPES: RecipeSchema[] = [
  {
    name: 'Vampirism (life leech)',
    npcName: 'vampirism',
    materials: [
      {
        name: 'Vampire Teeth',
        amount: 25,
        src: vampireteethSrc,
      },
      {
        name: 'Bloody Pincers',
        amount: 15,
        src: bloodypincersSrc,
      },
      {
        name: 'Piece of Dead Brain',
        amount: 5,
        src: deadbrainSrc,
      },
    ],
  },
  {
    name: 'Void (mana leech)',
    npcName: 'void',
    materials: [
      {
        name: 'Rope Belt',
        amount: 25,
        src: ropebeltSrc,
      },
      {
        name: 'Silencer Claws',
        amount: 25,
        src: silencerclawsSrc,
      },
      {
        name: 'Grimeleech Wings',
        amount: 5,
        src: grimeleechSrc,
      },
    ],
  },
  {
    name: 'Strike (critical)',
    npcName: 'strike',
    materials: [
      {
        name: 'Protective Charm',
        amount: 20,
        src: protectivecharmSrc,
      },
      {
        name: 'Sabretooth',
        amount: 25,
        src: sabretoothSrc,
      },
      {
        name: 'Vexclaw Talon',
        amount: 5,
        src: vexclawtalonSrc,
      },
    ],
  },
]

export const tierBasePrice: Record<number, number> = {
  1: 15000,
  2: 60000,
  3: 250000,
}

export const tierName: Record<number, string> = {
  1: 'basic',
  2: 'intricate',
  3: 'powerful',
}
