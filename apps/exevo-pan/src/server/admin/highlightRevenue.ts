/* eslint-disable no-underscore-dangle */
import { adminProcedure } from 'server/trpc'
import { prisma } from 'lib/prisma'
import {
  formatBrlValue,
  INITIAL_TIMESTAMP,
  oneMonthAgo,
  toMonthlyAverage,
} from './utils'

const TC_BRL = {
  40: 40 / 250,
  45: 45 / 250,
}

export const highlightRevenue = adminProcedure.query(async () => {
  const [monthlyTC, monthlyBRL, totalTC40Sum, currentTotalTC, totalBRL] =
    await Promise.all([
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
          lastUpdated: { lt: new Date('10/06/2023') },
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

  const totalTC40 = totalTC40Sum._sum?.price ?? 0
  const totalTC45 = (currentTotalTC._sum?.price ?? 0) - totalTC40

  const totalBRLSum =
    (totalBRL._sum?.price ?? 0) +
    totalTC40 * TC_BRL[40] +
    totalTC45 * TC_BRL[45]

  return {
    monthly: formatBrlValue(
      (monthlyBRL._sum?.price ?? 0) + (monthlyTC._sum?.price ?? 0) * TC_BRL[45],
    ),
    total: formatBrlValue(totalBRLSum),
    average: formatBrlValue(
      toMonthlyAverage(totalBRLSum, INITIAL_TIMESTAMP.HIGHLIGHT),
    ),
  }
})
