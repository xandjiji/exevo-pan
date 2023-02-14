import { z } from 'zod'
import { authedProcedure, publicProcedure } from 'server/trpc'
import { prisma } from 'lib/prisma'
import { avatar } from 'Constants'

const CreationSchema = z.object({
  name: z.string().min(2),
  private: z.boolean(),
  server: z.string().min(1),
  description: z.string().max(160).nullable(),
  avatarId: z.number().min(avatar.id.min).max(avatar.id.max),
  avatarDegree: z.number().min(avatar.degree.min).max(avatar.degree.max),
})

export type GuildCreationInput = z.infer<typeof CreationSchema>

export const createGuild = authedProcedure.input(CreationSchema).mutation(
  async ({
    ctx: {
      token: { id, name, proStatus },
    },
    input,
  }) =>
    prisma.guild.create({
      data: {
        ...input,
        private: proStatus ? input.private : false,
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

export const listGuilds = publicProcedure
  .input(
    z.object({
      pageSize: z.number().optional().default(20),
      pageIndex: z.number().optional().default(0),
      server: z.string().optional(),
      name: z.string().optional(),
    }),
  )
  .query(async ({ input: { pageIndex, pageSize, server, name } }) => {
    const where = {
      name: { contains: name },
      server: { contains: server },
    }

    const [page, count] = await Promise.all([
      prisma.guild.findMany({
        where,
        include: {
          _count: {
            select: { guildMembers: true },
          },
        },
        take: pageSize,
        skip: pageIndex * pageSize,
      }),
      prisma.guild.count({
        where,
      }),
    ])

    return {
      page: page.map(({ _count: { guildMembers }, messageBoard, ...data }) => ({
        ...data,
        memberCount: guildMembers,
      })),
      count,
    }
  })
