/* eslint-disable no-console */
/* eslint-disable import/no-extraneous-dependencies */
import { PrismaClient } from '@prisma/client'
import { VercelRequest, VercelResponse } from '@vercel/node'

const prisma = new PrismaClient()

export default async (
  request: VercelRequest,
  response: VercelResponse,
): Promise<void> => {
  const { method, body } = request
  const { id, nickname } = body

  if (method !== 'POST') {
    response.status(400).send(`${method} not allowed `)

    return
  }

  try {
    const newEntry = await prisma.characterObject.create({
      data: { id, nickname },
    })

    response.status(200).json(newEntry)
    return
  } catch (error) {
    response.status(400).json({ error })
  }
}
