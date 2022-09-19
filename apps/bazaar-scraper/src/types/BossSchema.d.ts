declare type BossSchema = {
  fixedDaysFrequency?: {
    min: number
    max: number
  }
  spawnCount?: number
  forceUnknown: boolean
}
