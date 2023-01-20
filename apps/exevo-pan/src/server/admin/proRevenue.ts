import { adminProcedure } from 'server/trpc'
import { prisma } from 'lib/prisma'
import { oneMonthAgo, toBrl, toMonthlyAverageCount } from './utils'

export const proRevenue = adminProcedure.query(async () => {
  const [monthly, total] = await Promise.all([
    prisma.user.count({
      where: {
        proSince: {
          gt: oneMonthAgo(),
        },
        paymentData: {
          confirmed: true,
        },
      },
    }),
    prisma.user.count({
      where: {
        paymentData: {
          confirmed: true,
        },
      },
    }),
  ])

  return {
    monthly: toBrl(monthly),
    total: toBrl(total),
    average: toBrl(toMonthlyAverageCount(total)),
  }
})
