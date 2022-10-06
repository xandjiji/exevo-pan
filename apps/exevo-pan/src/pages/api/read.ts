/* eslint-disable no-console */
/* eslint-disable import/no-extraneous-dependencies */
import { PrismaClient } from '@prisma/client'
import { VercelRequest, VercelResponse } from '@vercel/node'

const prisma = new PrismaClient()

type Query = Parameters<typeof prisma.characterObject.count>[0] &
  Parameters<typeof prisma.characterObject.findMany>[0]

export default async (
  request: VercelRequest,
  response: VercelResponse,
): Promise<void> => {
  const { method } = request
  if (method !== 'GET') {
    response.status(400).send(`${method} not allowed `)

    return
  }

  try {
    const results = await prisma.characterObject.findMany()

    response.status(200).json(results)
    return
  } catch (error) {
    response.status(400).json({ error })
  }
}
