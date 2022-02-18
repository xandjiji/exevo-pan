declare type CharacterItem = {
  name: string
  amount: number
}

declare type HirelingsInfo = {
  count: number
  jobs: number
  outfits: number
}

declare interface CharacterSkillsObject {
  magic: number
  club: number
  fist: number
  sword: number
  fishing: number
  axe: number
  distance: number
  shielding: number
}

declare type Outfit = {
  name: string
  type: number
}

declare interface CharacterObject {
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
}

declare type PartialCharacterObject = Omit<CharacterObject, 'serverData'>
