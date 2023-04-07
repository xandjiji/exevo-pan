declare type CheckedBoss = {
  location?: string
  checkedAt?: Date
  checkedBy?: string
  lastSpawned?: Date
} & BossStats
