import { z } from 'zod'
import { adminProcedure } from 'server/trpc'
import { prisma } from 'lib/prisma'

import { DAYS_IN, MILLISECONDS_IN, timestampDaysDiff } from 'utils'

const MONTH = DAYS_IN.MONTH * MILLISECONDS_IN.DAY
const oneMonthAgo = () => new Date(+new Date() - MONTH).toISOString()

const BRL_PRICE = 40
const toBrl = (count: number) => {
  const stringValue = (count * BRL_PRICE).toFixed(2).replace('.', ',')

  const [integerPart, decimalPart] = stringValue.split(',')

  return `R$ ${integerPart.replace(/(\d)(\d{3})$/, '$1.$2')},${decimalPart}`
}

const INITIAL_TIMESTAMP = 1670798862398
const toMonthlyAverageCount = (count: number): number => {
  const daysSinceStart = timestampDaysDiff(+new Date(), INITIAL_TIMESTAMP)
  return (count / daysSinceStart) * DAYS_IN.MONTH
}

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
