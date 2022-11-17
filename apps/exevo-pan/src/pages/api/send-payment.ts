import type { VercelRequest, VercelResponse } from '@vercel/node'
import { getToken } from 'next-auth/jwt'

/* @ ToDo:
- prisma request
- prevent empty
- POST only
- try-catch
*/

export default async (request: VercelRequest, response: VercelResponse) => {
  const token = await getToken({ req: request })
  if (token) {
    const { character } = request.body
    console.log('JSON Web Token', JSON.stringify(token, null, 2))
    console.log({ character })
    await new Promise((resolve) => setTimeout(resolve, 3000))
    response.send(200)
  } else {
    response.status(401)
  }
  response.end()
}
