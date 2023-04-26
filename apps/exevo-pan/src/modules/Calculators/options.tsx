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

export const pvpOptions: TypedOption<string>[] = [
  {
    name: (
      <>
        <TibiaIcons.Dove />
        Optional
      </>
    ),
    value: '0',
  },
  {
    name: (
      <>
        <TibiaIcons.WhiteSkull />
        Open
      </>
    ),
    value: '1',
  },
  {
    name: (
      <>
        <TibiaIcons.OrangeSkull />
        Retro Open
      </>
    ),
    value: '2',
  },
  {
    name: (
      <>
        <TibiaIcons.RedSkull />
        Hardcore
      </>
    ),
    value: '3',
  },
  {
    name: (
      <>
        <TibiaIcons.BlackSkull /> Retro Hardcore
      </>
    ),
    value: '4',
  },
]

export const locationOptions: TypedOption<string>[] = [
  {
    name: (
      <>
        <TibiaIcons.EuFlag /> EU
      </>
    ),
    value: '0',
  },
  {
    name: (
      <>
        <TibiaIcons.NaFlag /> NA
      </>
    ),
    value: '1',
  },
  {
    name: (
      <>
        <TibiaIcons.BrFlag /> BR
      </>
    ),
    value: '3',
  },
]
