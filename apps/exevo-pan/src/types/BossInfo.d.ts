declare type BossLocation = {
  src: string
  description: string
}

declare type BossInfo = {
  locations?: BossLocation[]
  loot?: string[]
  description?: () => JSX.Element
}
