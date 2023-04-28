import { TibiaIcons } from 'assets/svgs'
import { SkillOptions } from './types'

export const skillOptions: SkillOptions[] = [
  {
    name: (
      <>
        <TibiaIcons.Magic />
        Magic level
      </>
    ),
    value: 'magic',
  },
  {
    name: (
      <>
        <TibiaIcons.Distance />
        Distance
      </>
    ),
    value: 'distance',
  },
  {
    name: (
      <>
        <TibiaIcons.Club />
        Club
      </>
    ),
    value: 'club',
  },
  {
    name: (
      <>
        <TibiaIcons.Sword />
        Sword
      </>
    ),
    value: 'sword',
  },
  {
    name: (
      <>
        <TibiaIcons.Axe />
        Axe
      </>
    ),
    value: 'axe',
  },
]
