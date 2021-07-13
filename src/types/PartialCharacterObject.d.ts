declare interface PartialCharacterObject {
  id: number
  nickname: string
  auctionEnd: number
  currentBid: number
  hasBeenBidded: boolean
  outfitId: string
  serverId: number
  vocationId: number
  level: number
  skills: CharacterSkillsObject
}
