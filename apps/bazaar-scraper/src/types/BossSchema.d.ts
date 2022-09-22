declare type DaysRange = {
  min: number
  max: number
}

declare type BossSchema = {
  fixedDaysFrequency: DaysRange
  spawnCount?: number
}
