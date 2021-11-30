declare type VocationOptions = 0 | 1 | 2 | 3 | 4
declare type PvpOptions = 0 | 1 | 2 | 3 | 4
declare type LocationOptions = 0 | 1 | 2
declare type SkillOptions = 'axe' | 'club' | 'distance' | 'magic' | 'sword'

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
  skillKey: Set<SkillOptions>
  imbuementsSet: Set<string>
  charmsSet: Set<string>
  itemSet: Set<string>
  rareNick: boolean
  questSet: Set<string>
  outfitSet: Set<string>
  mountSet: Set<string>
  achievementSet: Set<string>
  soulwarAvailable: boolean
}

type FilterOptionsPrimitives = Pick<
  FilterState,
  | 'nicknameFilter'
  | 'minLevel'
  | 'maxLevel'
  | 'minSkill'
  | 'rareNick'
  | 'soulwarAvailable'
>

declare interface SerializedFilterOptions extends FilterOptionsPrimitives {
  vocation: number[]
  pvp: number[]
  battleye: boolean[]
  location: number[]
  serverSet: string[]
  skillKey: string[]
  imbuementsSet: string[]
  charmsSet: string[]
  itemSet: string[]
  questSet: string[]
  outfitSet: string[]
  mountSet: string[]
  achievementSet: string[]
}
