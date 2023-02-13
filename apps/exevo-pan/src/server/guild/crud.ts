import { z } from 'zod'
import { authedProcedure } from 'server/trpc'
import { prisma } from 'lib/prisma'
import { avatar } from 'Constants'

const CreationSchema = z.object({
  name: z.string().min(2),
  server: z.string().min(1),
  description: z.string().max(300).nullable(),
  avatarId: z.number().min(avatar.id.min).max(avatar.id.max),
  avatarDegree: z.number().min(avatar.degree.min).max(avatar.degree.max),
})

export type GuildCreationInput = z.infer<typeof CreationSchema>

export const createGuild = authedProcedure.input(CreationSchema).mutation(
  async ({
    ctx: {
      token: { id, name },
    },
    input,
  }) =>
    prisma.guild.create({
      data: {
        ...input,
        guildMembers: {
          create: {
            userId: id,
            name,
            role: 'ADMIN',
          },
        },
      },
    }),
)
