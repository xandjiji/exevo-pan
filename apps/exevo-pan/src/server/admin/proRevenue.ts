import { adminProcedure } from 'server/trpc'
import { prisma } from 'lib/prisma'
import {
  oneMonthAgo,
  exevoProOrdersToBrl,
  toMonthlyAverage,
  INITIAL_TIMESTAMP,
} from './utils'

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
    monthly: exevoProOrdersToBrl(monthly),
    total: exevoProOrdersToBrl(total),
    average: exevoProOrdersToBrl(
      toMonthlyAverage(total, INITIAL_TIMESTAMP.EXEVO_PRO),
    ),
  }
})
