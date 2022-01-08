declare type VocationOptions = 0 | 1 | 2 | 3 | 4
declare type PvpOptions = 0 | 1 | 2 | 3 | 4
declare type LocationOptions = 0 | 1 | 2
declare type SkillOptions = 'axe' | 'club' | 'distance' | 'magic' | 'sword'

declare interface FilterOptions {
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
  skillKey: Set<SkillOptions>
  imbuementsSet: Set<string>
  charmsSet: Set<string>
  itemSet: Set<string>
  rareNick: boolean
  questSet: Set<string>
  addon: number
  sex: boolean
  outfitSet: Set<string>
  storeOutfitSet: Set<string>
  mountSet: Set<string>
  storeMountSet: Set<string>
  achievementSet: Set<string>
  soulwarAvailable: boolean
}
