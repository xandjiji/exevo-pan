import * as Icon from './icons'
import { SkillOptions } from './types'

export const skillOptions: SkillOptions[] = [
  {
    name: (
      <>
        <Icon.Magic />
        Magic level
      </>
    ),
    value: 'magic',
  },
  {
    name: (
      <>
        <Icon.Distance />
        Distance
      </>
    ),
    value: 'distance',
  },
  {
    name: (
      <>
        <Icon.Club />
        Club
      </>
    ),
    value: 'club',
  },
  {
    name: (
      <>
        <Icon.Sword />
        Sword
      </>
    ),
    value: 'sword',
  },
  {
    name: (
      <>
        <Icon.Axe />
        Axe
      </>
    ),
    value: 'axe',
  },
]
