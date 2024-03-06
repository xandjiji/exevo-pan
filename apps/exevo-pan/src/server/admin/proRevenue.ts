import { adminProcedure } from 'server/trpc'
import { prisma } from 'lib/prisma'
import {
  exevoProOrdersToBrl,
  INITIAL_TIMESTAMP,
  oneMonthAgo,
  toMonthlyAverage,
} from './utils'

export const proRevenue = adminProcedure.query(async () => {
  const [monthly, total] = await Promise.all([
    prisma.user.count({
      where: {
        proSince: {
          gt: oneMonthAgo(),
        },
        paymentData: { confirmed: true, noBill: false },
      },
    }),
    prisma.user.count({
      where: {
        paymentData: { confirmed: true, noBill: false },
      },
    }),
  ])

  return {
    monthly: exevoProOrdersToBrl(monthly),
    total: exevoProOrdersToBrl(total),
    average: exevoProOrdersToBrl(
      toMonthlyAverage(total, INITIAL_TIMESTAMP.EXEVO_PRO),
    ),
  }
})
