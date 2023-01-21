/* eslint-disable no-underscore-dangle */
import { adminProcedure } from 'server/trpc'
import { prisma } from 'lib/prisma'
import {
  oneMonthAgo,
  tcToBrl,
  formatBrlValue,
  toMonthlyAverage,
  INITIAL_TIMESTAMP,
} from './utils'

export const highlightRevenue = adminProcedure.query(async () => {
  const [monthlyTC, monthlyBRL, totalTC, totalBRL] = await Promise.all([
    prisma.highlightedAuction.aggregate({
      _sum: { price: true },
      where: {
        active: true,
        paymentMethod: 'TIBIA_COINS',
        lastUpdated: { gt: oneMonthAgo() },
      },
    }),
    prisma.highlightedAuction.aggregate({
      _sum: { price: true },
      where: {
        active: true,
        paymentMethod: 'PIX',
        lastUpdated: { gt: oneMonthAgo() },
      },
    }),
    prisma.highlightedAuction.aggregate({
      _sum: { price: true },
      where: {
        active: true,
        paymentMethod: 'TIBIA_COINS',
      },
    }),
    prisma.highlightedAuction.aggregate({
      _sum: { price: true },
      where: {
        active: true,
        paymentMethod: 'PIX',
      },
    }),
  ])

  const totalBRLSum =
    (totalBRL._sum?.price ?? 0) + tcToBrl(totalTC._sum?.price ?? 0)

  return {
    monthly: formatBrlValue(
      (monthlyBRL._sum?.price ?? 0) + tcToBrl(monthlyTC._sum?.price ?? 0),
    ),
    total: formatBrlValue(totalBRLSum),
    average: formatBrlValue(
      toMonthlyAverage(totalBRLSum, INITIAL_TIMESTAMP.HIGHLIGHT),
    ),
  }
})
