import type { VercelRequest, VercelResponse } from '@vercel/node'
import { getToken } from 'next-auth/jwt'
import { prisma } from 'lib/prisma'

export default async (request: VercelRequest, response: VercelResponse) => {
  try {
    const token = await getToken({ req: request })
    if (token && token.role === 'ADMIN') {
      const { method, query } = request

      if (method === 'GET') {
        const pageSize = query.pageSize ? Number(query.pageSize) : 30
        const pageIndex = query.pageIndex ? Number(query.pageIndex) : 0
        const nickname = query.nickname ? query.nickname.toString() : undefined

        const [page, count] = await Promise.all([
          prisma.user.findMany({
            where: {
              paymentData: {
                isNot: undefined,
                character: { contains: nickname },
              },
            },
            orderBy: {
              paymentData: {
                lastUpdated: 'desc',
              },
            },
            include: { paymentData: true },
            take: pageSize,
            skip: pageIndex * pageSize,
          }),
          prisma.user.count({
            where: {
              paymentData: {
                isNot: undefined,
                character: { contains: nickname },
              },
            },
          }),
        ])

        response.status(200).json({ page: page ?? [], count })
      }

      if (method === 'PATCH') {
        const { id, confirmed } = JSON.parse(request.body)

        const currentDate = new Date().toISOString()

        const payment = await prisma.paymentData.findUnique({
          where: { userId: id },
        })

        const result = await prisma.$transaction([
          prisma.user.update({
            where: { id },
            data: {
              proStatus: confirmed,
              proSince: confirmed ? currentDate : null,
              paymentData: {
                update: {
                  confirmed,
                },
              },
            },
          }),
          confirmed
            ? prisma.transaction.create({
                data: {
                  value: 250,
                  currency: 'TIBIA_COINS',
                  type: 'EXEVO_PRO',
                  date: currentDate,
                  user: { connect: { id } },
                  exevoProPayment: { connect: { id: payment?.id } },
                },
              })
            : prisma.transaction.delete({
                where: { exevoProPaymentId: payment?.id },
              }),
        ])

        response.status(200).json(result)
      }
    } else {
      response.status(401)
    }
  } catch (error) {
    response.json(error).status(400)
  }
}
