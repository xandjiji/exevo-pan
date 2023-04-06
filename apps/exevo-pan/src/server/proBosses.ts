import { z } from 'zod'
import { premiumProcedure } from 'server/trpc'
import { BossesClient } from 'services/server'
import { premiumBosses } from 'Constants'

export const proBosses = premiumProcedure
  .input(z.object({ server: z.string() }))
  .query(async ({ input: { server } }) => {
    const { bosses } = await BossesClient.fetchServerBossChances({
      server,
      isPro: true,
    })
    const premiumBossStats: BossStats[] = bosses.filter(({ name }) =>
      premiumBosses.set.has(name),
    )

    return premiumBossStats
  })
