import * as Icons from './icons'
import { RecipeSchema } from './types'

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
    materials: [
      {
        name: 'Vampire Teeth',
        amount: 25,
        icon: Icons.VampireTeeth,
      },
      {
        name: 'Bloody Pincers',
        amount: 15,
        icon: Icons.BloodyPincers,
      },
      {
        name: 'Piece of Dead Brain',
        amount: 5,
        icon: Icons.PieceOfDeadBrain,
      },
    ],
  },
  {
    name: 'Void (mana leech)',
    materials: [
      {
        name: 'Rope Belts',
        amount: 25,
        icon: Icons.RopeBelt,
      },
      {
        name: 'Silencer Claws',
        amount: 25,
        icon: Icons.SilencerClaws,
      },
      {
        name: 'Grimeleech Wings',
        amount: 5,
        icon: Icons.GrimeleechWings,
      },
    ],
  },
  {
    name: 'Strike (critical)',
    materials: [
      {
        name: 'Protective Charms',
        amount: 20,
        icon: Icons.ProtectiveCharm,
      },
      {
        name: 'Sabretooth',
        amount: 25,
        icon: Icons.Sabretooth,
      },
      {
        name: 'Vexclaw Talons',
        amount: 5,
        icon: Icons.VexclawTalon,
      },
    ],
  },
]
