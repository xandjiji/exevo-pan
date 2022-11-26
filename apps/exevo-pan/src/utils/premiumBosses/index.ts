import { TrackedBossName } from 'data-dictionary/dist/dictionaries/bosses'
import { premiumBosses } from 'Constants'

const premiumBossesSet = new Set(premiumBosses)

export const pluckPremiumBosses = (bossChances: BossChances): BossChances => ({
  ...bossChances,
  bosses: bossChances.bosses.filter(
    ({ name }) => !premiumBossesSet.has(name as TrackedBossName),
  ),
})
