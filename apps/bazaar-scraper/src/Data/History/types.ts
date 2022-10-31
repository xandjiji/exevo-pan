export type ScrapHistoryData = {
  lastScrapedId: number
  unfinishedAuctions: UnfinishedAuction[]
}

export interface OldCharacterObject {
  id: number
  nickname: string
  auctionEnd: number
  currentBid: number
  hasBeenBidded: boolean
  outfitId: string
  serverId: number
  vocationId: number
  sex: boolean
  level: number
  achievementPoints: number
  bossPoints: number
  tcInvested: number
  tags: string[]
  imbuements: string[]
  items: number[]
  charms: string[]
  transfer: boolean
  quests: string[]
  storeItems: CharacterItem[]
  outfits: Outfit[]
  storeOutfits: Outfit[]
  mounts: string[]
  storeMounts: string[]
  rareAchievements: string[]
  skills: CharacterSkillsObject
  serverData: ServerObject
  hirelings: HirelingsInfo
  preySlot: boolean
  huntingSlot: boolean
  charmInfo: CharmInfo
}

export type PartialCharacterObject = Omit<CharacterObject, 'serverData'>
