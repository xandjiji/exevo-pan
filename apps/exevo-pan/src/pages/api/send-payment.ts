import type { VercelRequest, VercelResponse } from '@vercel/node'
import { getToken } from 'next-auth/jwt'
import { prisma } from 'lib/prisma'

export default async (request: VercelRequest, response: VercelResponse) => {
  try {
    const token = await getToken({ req: request })
    if (token && !token.proStatus) {
      const { character } = JSON.parse(request.body)

      const data = {
        character,
        confirmed: false,
        lastUpdated: new Date().toISOString(),
      }

      const { paymentData } = await prisma.user.update({
        where: { id: token.id },
        data: {
          paymentData: {
            upsert: { create: data, update: data },
          },
        },
        include: { paymentData: true },
      })

      response.status(200).json(paymentData)
    } else {
      response.status(401)
    }
  } catch (error) {
    response.json(error).status(400)
  }
}
