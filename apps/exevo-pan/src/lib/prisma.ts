/* eslint-disable no-var */
/* eslint-disable vars-on-top */
import { PrismaClient } from 'db/prisma/generated/client'

declare global {
  var prisma: PrismaClient | undefined
}

export const prisma = global.prisma || new PrismaClient()

if (process.env.NODE_ENV !== 'production') global.prisma = prisma
