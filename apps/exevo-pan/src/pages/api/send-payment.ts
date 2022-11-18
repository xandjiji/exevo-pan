import type { VercelRequest, VercelResponse } from '@vercel/node'
import { getToken } from 'next-auth/jwt'
import { prisma } from 'lib/prisma'

export default async (request: VercelRequest, response: VercelResponse) => {
  try {
    const token = await getToken({ req: request })
    if (token) {
      const { character } = JSON.parse(request.body)

      const data = {
        character,
        confirmed: false,
        lastUpdated: new Date().toISOString(),
      }

      await prisma.user.update({
        where: { id: token.id },
        data: {
          paymentData: {
            upsert: { create: data, update: data },
          },
        },
      })
      response.send(200)
    } else {
      response.status(401)
    }
  } catch (error) {
    response.status(400).json(error)
  }
  response.end()
}
