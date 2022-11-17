import type { VercelRequest, VercelResponse } from '@vercel/node'
import { getToken } from 'next-auth/jwt'
import { prisma } from 'lib/prisma'

/* @ ToDo:
- prevent empty
- POST only
- try-catch
*/

export default async (request: VercelRequest, response: VercelResponse) => {
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
  response.end()
}
