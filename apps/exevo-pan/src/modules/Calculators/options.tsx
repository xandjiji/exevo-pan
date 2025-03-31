import { TibiaIcons } from 'assets/svgs'
import { Skill, TypedOption, Vocation } from './types'

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
  {
    name: (
      <>
        <TibiaIcons.Monk />
        Monk
      </>
    ),
    value: 'monk',
  },
]

export const skillOptions: TypedOption<Skill>[] = [
  {
    name: (
      <>
        <TibiaIcons.Fist />
        Fist
      </>
    ),
    value: 'fist',
  },
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
  {
    name: (
      <>
        <TibiaIcons.Shield />
        Shield
      </>
    ),
    value: 'shield',
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
    value: '2',
  },
]
