declare type MonthlySummary = {
  current: number
  lastMonth: number[]
}

declare type DistributionData = Record<string, number>

declare type StatisticsData = {
  totalRevenue: MonthlySummary
  totalTibiaCoins: MonthlySummary
  successRate: number
  top10Bid: CharacterObject[]
  top10Level: CharacterObject[]
  top10Magic: CharacterObject[]
  top10Club: CharacterObject[]
  top10Fist: CharacterObject[]
  top10Sword: CharacterObject[]
  top10Fishing: CharacterObject[]
  top10Axe: CharacterObject[]
  top10Distance: CharacterObject[]
  top10Shielding: CharacterObject[]
  vocationPercentage: DistributionData
}
