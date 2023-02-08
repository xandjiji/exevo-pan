import { z } from 'zod'
import { authedProcedure } from 'server/trpc'
import { prisma } from 'lib/prisma'

const CreationSchema = z.object({
  name: z.string().min(2),
  server: z.string().min(1),
  private: z.boolean(),
  description: z.string().max(300).nullable(),
  /* @ ToDo: update avatarId max */
  avatarId: z.number().min(0).max(300),
  avatarDegree: z.number().min(0).max(360),
})

export type GuildCreationInput = z.infer<typeof CreationSchema>

export const createGuild = authedProcedure
  .input(CreationSchema)
  .mutation(({ input }) => prisma.guild.create({ data: input }))
