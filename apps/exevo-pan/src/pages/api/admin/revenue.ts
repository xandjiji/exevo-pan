import type { VercelRequest, VercelResponse } from '@vercel/node'
import { getToken } from 'next-auth/jwt'
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

export default async (request: VercelRequest, response: VercelResponse) => {
  try {
    const token = await getToken({ req: request })
    if (token && token.role === 'ADMIN') {
      if (request.method === 'GET') {
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

        response.status(200).json({
          monthly: toBrl(monthly),
          total: toBrl(total),
          average: toBrl(toMonthlyAverageCount(total)),
        })
      }
    } else {
      response.status(401)
    }
  } catch (error) {
    response.json(error).status(400)
  }
}
