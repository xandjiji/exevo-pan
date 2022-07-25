import vampireteethSrc from 'assets/vampireTeeth.png'
import bloodypincersSrc from 'assets/bloodyPincers.png'
import deadbrainSrc from 'assets/deadBrain.png'
import ropebeltSrc from 'assets/ropeBelt.png'
import silencerclawsSrc from 'assets/silencerClaws.png'
import grimeleechSrc from 'assets/grimeleech.png'
import protectivecharmSrc from 'assets/protectiveCharm.png'
import sabretoothSrc from 'assets/sabretooth.png'
import vexclawtalonSrc from 'assets/vexclawTalon.png'
import { RecipeSchema } from './types'

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
        name: 'Rope Belts',
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
        name: 'Protective Charms',
        amount: 20,
        src: protectivecharmSrc,
      },
      {
        name: 'Sabretooth',
        amount: 25,
        src: sabretoothSrc,
      },
      {
        name: 'Vexclaw Talons',
        amount: 5,
        src: vexclawtalonSrc,
      },
    ],
  },
]

export const tierBasePrice: Record<number, number> = {
  1: 15000,
  2: 55000,
  3: 150000,
}

export const tierName: Record<number, string> = {
  1: 'basic',
  2: 'intricate',
  3: 'powerful',
}
