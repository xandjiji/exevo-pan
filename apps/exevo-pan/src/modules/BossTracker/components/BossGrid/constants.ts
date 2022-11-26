import { premiumBosses } from 'Constants'

export const fallbackPremiumBosses: BossStats[] = premiumBosses.map((name) => ({
  name,
}))

export const premiumBossSet = new Set<string>(premiumBosses)
