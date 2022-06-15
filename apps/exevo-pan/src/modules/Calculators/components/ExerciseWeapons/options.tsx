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
        <Icon.Druid />
        Druid
      </>
    ),
    value: 'druid',
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
]

export const skillOptions: TypedOption<Skill>[] = [
  {
    name: (
      <>
        <Icon.Sorcerer />
        Melee
      </>
    ),
    value: 'melee',
  },
  {
    name: (
      <>
        <Icon.Sorcerer />
        Distance
      </>
    ),
    value: 'distance',
  },
  {
    name: (
      <>
        <Icon.Sorcerer />
        Magic
      </>
    ),
    value: 'magic',
  },
]
