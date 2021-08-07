declare type MonthlySummary = {
  current: number
  lastMonth: number[]
}

declare type CharacterInfo = {
  id: number
  nickname: string
  currentBid: number
}

/* @ ToDo: change this to Record<string, number> after backend fix */
declare type DistributionData = Record<string, string>

declare type StatisticsData = {
  totalRevenue: MonthlySummary
  totalTibiaCoins: MonthlySummary
  successRate: string
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
