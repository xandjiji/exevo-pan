declare type BossInfo = {
  locations?: string[]
  loot?: string[]
  description?: () => JSX.Element
}
