import { TypedOption, WeaponOption } from './types'

export const weaponOptions: TypedOption<WeaponOption>[] = [
  {
    name: 'Auto',
    value: 'auto',
  },
  {
    name: 'Lasting (14400 charges)',
    value: 'lasting',
  },
  {
    name: 'Durable (1800 charges)',
    value: 'durable',
  },
  {
    name: 'Regular (500 charges)',
    value: 'regular',
  },
]
