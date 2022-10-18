import { broadcast } from 'logging'
import { prisma } from 'services'

export const calculateSuccessRate = async (): Promise<number> => {
  broadcast('Calculating auction success rate...', 'neutral')
  const totalCount = await prisma.currentAuction.count()
  const successCount = await prisma.currentAuction.count({
    where: { hasBeenBidded: true },
  })

  const result = +((successCount / totalCount) * 100).toFixed(2)
  return Number.isNaN(result) ? 50 : result
}
