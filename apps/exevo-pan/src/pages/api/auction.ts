/* eslint-disable import/no-extraneous-dependencies */
import { VercelRequest, VercelResponse } from '@vercel/node'
import { prisma } from 'services/prisma'

export default async (
  request: VercelRequest,
  response: VercelResponse,
): Promise<void> => {
  const { method, query } = request
  if (method !== 'GET') {
    response.status(400).send(`${method} not allowed `)

    return
  }

  try {
    const { id, from } = query

    response.setHeader('Cache-Control', `max-age=180, s-maxage=180`)

    let result: CharacterObject | null = null

    if (from === 'current') {
      result = await prisma.currentAuction.findFirst({
        where: { id: +id },
        include: { server: true, rareItems: true },
      })
    }

    if (from === 'history') {
      result = await prisma.historyAuction.findFirst({
        where: { id: +id },
        include: { server: true },
      })
    }

    if (from === 'any') {
      const [currentResult, historyResult] = await Promise.all([
        prisma.currentAuction.findFirst({
          where: { id: +id },
          include: { server: true, rareItems: true },
        }),
        prisma.historyAuction.findFirst({
          where: { id: +id },
          include: { server: true },
        }),
      ])

      result = currentResult ?? historyResult
    }

    if (result) {
      response.status(200).json(result)
    } else {
      response.status(404).json(null)
    }
    return
  } catch (error) {
    response.status(400).json({ error })
  }
}
