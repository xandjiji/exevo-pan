import * as Icon from './icons'
import { TypedOption, Vocation, Skill } from './types'

export const vocationOptions: TypedOption<Vocation>[] = [
  {
    name: (
      <>
        <Icon.Knight />
        Knight
      </>
    ),
    value: 'knight',
  },
  {
    name: (
      <>
        <Icon.Paladin />
        Paladin
      </>
    ),
    value: 'paladin',
  },
  {
    name: (
      <>
        <Icon.Sorcerer />
        Sorcerer
      </>
    ),
    value: 'sorcerer',
  },
  {
    name: (
      <>
        <Icon.Druid />
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
        <Icon.Axe />
        Axe/Club/Sword
      </>
    ),
    value: 'melee',
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
        <Icon.Magic />
        Magic level
      </>
    ),
    value: 'magic',
  },
]
