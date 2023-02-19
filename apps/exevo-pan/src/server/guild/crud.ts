import { z } from 'zod'
import { authedProcedure, publicProcedure } from 'server/trpc'
import { TRPCError } from '@trpc/server'
import { prisma } from 'lib/prisma'
import { avatar, guildEditorRoles } from 'Constants'

const throwIfForbiddenGuildRequest = async ({
  guildId,
  requesterId,
}: {
  guildId: string
  requesterId: string
}) => {
  const guild = await prisma.guild.findUnique({
    where: { id: guildId },
    include: { guildMembers: { include: { user: true } } },
  })

  if (!guild) {
    throw new TRPCError({
      code: 'BAD_REQUEST',
      message: `Guild [${guildId}] not found`,
    })
  }

  const requesterMember = guild.guildMembers.find(
    ({ userId }) => userId === requesterId,
  )

  if (!requesterMember) {
    throw new TRPCError({
      code: 'UNAUTHORIZED',
    })
  }

  const hasProMember = guild.guildMembers.some(
    ({ user: { proStatus } }) => proStatus,
  )

  const isEditor = guildEditorRoles.has(requesterMember.role)

  return { guild, requesterMember, hasProMember, isEditor }
}

const CreationSchema = z.object({
  name: z.string().min(2).max(32),
  private: z.boolean(),
  server: z.string().min(1).max(32),
  description: z.string().max(600).nullable(),
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

const EditSchema = z.object({
  guildId: z.string(),
  name: z.string().min(2).max(32).optional(),
  private: z.boolean().optional(),
  server: z.string().min(1).max(32).optional(),
  description: z.string().max(600).optional(),
  messageBoard: z.string().max(2048).optional(),
  avatarId: z.number().min(avatar.id.min).max(avatar.id.max).optional(),
  avatarDegree: z
    .number()
    .min(avatar.degree.min)
    .max(avatar.degree.max)
    .optional(),
})

export type GuildEditInput = z.infer<typeof EditSchema>

export const updateGuild = authedProcedure
  .input(EditSchema)
  .mutation(async ({ ctx: { token }, input }) => {
    const { guildId, ...guildDataPatch } = input

    const { hasProMember, isEditor } = await throwIfForbiddenGuildRequest({
      guildId,
      requesterId: token.id,
    })

    if (!isEditor) {
      throw new TRPCError({
        code: 'FORBIDDEN',
      })
    }

    if (guildDataPatch.private !== undefined && !hasProMember) {
      throw new TRPCError({
        code: 'FORBIDDEN',
      })
    }

    const result = prisma.guild.update({
      where: { id: guildId },
      data: guildDataPatch,
    })

    return result
  })

export const listGuilds = publicProcedure
  .input(
    z.object({
      pageSize: z.number().optional().default(20),
      pageIndex: z.number().optional().default(0),
      server: z.string().optional(),
      name: z.string().optional(),
      myGuilds: z.boolean().optional().default(false),
    }),
  )
  .query(
    async ({ ctx, input: { pageIndex, pageSize, server, name, myGuilds } }) => {
      const where = {
        name: myGuilds ? undefined : { contains: name },
        server: myGuilds ? undefined : { contains: server },
        guildMembers:
          myGuilds && ctx.token
            ? { some: { userId: ctx.token.id } }
            : undefined,
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
        page: page.map(
          ({ _count: { guildMembers }, messageBoard, ...data }) => ({
            ...data,
            memberCount: guildMembers,
          }),
        ),
        count,
      }
    },
  )
