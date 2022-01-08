declare type MonthlySummary = {
  current: number
  lastMonth: number[]
}

declare type CharacterInfoKey = Partial<
  Omit<PartialCharacterObject, 'id' | 'nickname' | 'skills'>
> &
  Partial<CharacterSkillsObject>

declare interface CharacterInfo extends CharacterInfoKey {
  id: number
  nickname: string
}

declare type DistributionData = Record<string, number>

declare type StatisticsData = {
  totalRevenue: MonthlySummary
  totalTibiaCoins: MonthlySummary
  successRate: number
  top10Bid: CharacterInfo[]
  top10Level: CharacterInfo[]
  top10Magic: CharacterInfo[]
  top10Club: CharacterInfo[]
  top10Fist: CharacterInfo[]
  top10Sword: CharacterInfo[]
  top10Fishing: CharacterInfo[]
  top10Axe: CharacterInfo[]
  top10Distance: CharacterInfo[]
  top10Shielding: CharacterInfo[]
  vocationPercentage: DistributionData
}
