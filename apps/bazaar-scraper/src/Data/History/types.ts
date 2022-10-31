export type ScrapHistoryData = {
  lastScrapedId: number
  unfinishedAuctions: UnfinishedAuction[]
}

type ServerLocation =
  | { string: 'BR'; type: 2 }
  | { string: 'EU'; type: 0 }
  | { string: 'NA'; type: 1 }

type PvpType =
  | { string: 'Hardcore'; type: 3 }
  | { string: 'Open'; type: 1 }
  | { string: 'Optional'; type: 0 }
  | { string: 'Retro Hardcore'; type: 4 }
  | { string: 'Retro Open'; type: 2 }

export interface OldServerObject {
  battleye: boolean
  experimental: boolean
  serverId: number
  serverName: string
  serverLocation: ServerLocation
  pvpType: PvpType
}

export type PartialServerObject = Omit<OldServerObject, 'serverId'>

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
  serverData: OldServerObject
  hirelings: HirelingsInfo
  preySlot: boolean
  huntingSlot: boolean
  charmInfo: CharmInfo
}

export type PartialCharacterObject = Omit<OldCharacterObject, 'serverData'>
