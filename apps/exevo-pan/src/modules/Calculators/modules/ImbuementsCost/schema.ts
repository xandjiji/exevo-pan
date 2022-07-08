import * as Icons from './icons'
import { Recipe } from './types'

export const RECIPES: Recipe[] = [
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
