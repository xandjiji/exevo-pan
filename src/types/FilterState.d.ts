declare type VocationOptions = 0 | 1 | 2 | 3 | 4
declare type PvpOptions = 0 | 1 | 2 | 3 | 4
declare type LocationOptions = 0 | 1 | 2
declare type ImbuementOptions = 'axe' | 'club' | 'distance' | 'magic' | 'sword'

declare interface FilterState {
  nicknameFilter: string
  vocation: Set<VocationOptions>
  pvp: Set<PvpOptions>
  battleye: Set<boolean>
  location: Set<LocationOptions>
  serverSet: Set<string>
  minLevel: number
  maxLevel: number
  minSkill: number
  maxSkill: number
  skillKey: Set<ImbuementOptions>
  imbuementsSet: Set<string>
  itemSet: Set<string>
  rareNick: boolean
  soulwarFilter: boolean
}

type FilterOptionsPrimitives = Pick<
  FilterState,
  | 'nicknameFilter'
  | 'minLevel'
  | 'maxLevel'
  | 'minSkill'
  | 'maxSkill'
  | 'rareNick'
  | 'soulwarFilter'
>

declare interface SerializedFilterOptions extends FilterOptionsPrimitives {
  vocation: number[]
  pvp: number[]
  battleye: boolean[]
  location: number[]
  serverSet: string[]
  skillKey: string[]
  imbuementsSet: string[]
  itemSet: string[]
}
