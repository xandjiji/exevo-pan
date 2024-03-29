import { adminProcedure } from 'server/trpc'
import { prisma } from 'lib/prisma'
import {
  formatBrlValue,
  INITIAL_TIMESTAMP,
  oneMonthAgo,
  toMonthlyAverage,
} from './utils'

export const proRevenue = adminProcedure.query(async () => {
  const [monthly, total40, currentTotal] = await Promise.all([
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
        proSince: {
          lt: new Date('10/06/2023'),
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

  const total45 = currentTotal - total40
  const totalBrl = total40 * 40 + total45 * 45

  return {
    monthly: formatBrlValue(monthly * 45),
    total: formatBrlValue(totalBrl),
    average: formatBrlValue(
      toMonthlyAverage(totalBrl, INITIAL_TIMESTAMP.EXEVO_PRO),
    ),
  }
})
