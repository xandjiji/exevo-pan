declare type VocationOptions = 0 | 1 | 2 | 3 | 4
declare type SkillOptions = 'axe' | 'club' | 'distance' | 'magic' | 'sword'

declare interface FilterOptions {
  auctionIds: Set<number>
  nicknameFilter: string
  vocation: Set<number>
  pvp: Set<string>
  battleye: Set<boolean>
  location: Set<string>
  serverSet: Set<string>
  minLevel: number
  maxLevel: number
  minSkill: number
  maxSkill: number
  bossPoints: number
  tcInvested: number
  tags: Set<string>
  skillKey: Set<string>
  imbuementsSet: Set<string>
  charmsSet: Set<string>
  questSet: Set<string>
  addon: number
  sex: boolean
  outfitSet: Set<string>
  storeOutfitSet: Set<string>
  mountSet: Set<string>
  storeMountSet: Set<string>
  achievementSet: Set<string>
  charmExpansion: boolean
  preySlot: boolean
  huntingSlot: boolean
  rewardShrine: boolean
  imbuementShrine: boolean
  dummy: boolean
  mailbox: boolean
  goldPouch: boolean
  hireling: boolean
  transferAvailable: boolean
  biddedOnly: boolean
  rareItemSet: Set<string>
}
