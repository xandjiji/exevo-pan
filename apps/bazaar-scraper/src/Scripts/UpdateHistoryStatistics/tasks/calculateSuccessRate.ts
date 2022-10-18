import { broadcast } from 'logging'
import { prisma } from 'services'
import { retryWrapper } from 'utils'

const db = {
  countFromHistory: retryWrapper(prisma.historyAuction.count),
}

export const calculateSuccessRate = async (): Promise<number> => {
  broadcast('Calculating auction success rate...', 'neutral')
  const totalCount = await db.countFromHistory()
  const successCount = await db.countFromHistory({
    where: { hasBeenBidded: true },
  })

  const result = +((successCount / totalCount) * 100).toFixed(2)
  return Number.isNaN(result) ? 50 : result
}
