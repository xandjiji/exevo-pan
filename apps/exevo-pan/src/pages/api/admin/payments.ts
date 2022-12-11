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

        const [page, count] = await Promise.all([
          prisma.user.findMany({
            where: {
              paymentData: {
                isNot: undefined,
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
              },
            },
          }),
        ])

        response.status(200).json({ page: page ?? [], count })
      }

      if (method === 'PATCH') {
        const { id, confirmed } = JSON.parse(request.body)

        const result = await prisma.user.update({
          where: { id },
          data: {
            proStatus: confirmed,
            proSince: confirmed ? new Date().toISOString() : null,
            paymentData: {
              update: {
                confirmed,
              },
            },
          },
        })

        response.status(200).json(result)
      }
    } else {
      response.status(401)
    }
  } catch (error) {
    response.json(error).status(400)
  }
}
