import { TibiaIcons } from 'assets/svgs'
import { TypedOption, Vocation, Skill } from './types'

export const vocationOptions: TypedOption<Vocation>[] = [
  {
    name: (
      <>
        <TibiaIcons.Knight />
        Knight
      </>
    ),
    value: 'knight',
  },
  {
    name: (
      <>
        <TibiaIcons.Paladin />
        Paladin
      </>
    ),
    value: 'paladin',
  },
  {
    name: (
      <>
        <TibiaIcons.Sorcerer />
        Sorcerer
      </>
    ),
    value: 'sorcerer',
  },
  {
    name: (
      <>
        <TibiaIcons.Druid />
        Druid
      </>
    ),
    value: 'druid',
  },
]

export const skillOptions: TypedOption<Skill>[] = [
  {
    name: (
      <>
        <TibiaIcons.Axe />
        Axe/Club/Sword
      </>
    ),
    value: 'melee',
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
        <TibiaIcons.Magic />
        Magic level
      </>
    ),
    value: 'magic',
  },
]
