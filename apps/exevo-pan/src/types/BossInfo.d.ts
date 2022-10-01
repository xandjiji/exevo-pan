declare type RaidMessageStyle = 'HIGHLIGHT' | 'UNANNOUNCED' | 'REGULAR'

declare type RaidMessage = {
  time: string
  message: string
  style: RaidMessageStyle
}

declare type BossLocation = {
  src: string
  description?: string
}

declare type BossInfo = {
  locations?: BossLocation[]
  loot?: string[]
  raidMessages?: RaidMessage[]
}
