/* eslint-disable camelcase */
import { stripTime } from 'shared-utils/dist/time'
import { z } from 'zod'
import { authedProcedure, publicProcedure } from 'server/trpc'
import { TRPCError } from '@trpc/server'
import { prisma } from 'lib/prisma'
import {
  BossesClient,
  DeviceNotificationClient,
  PageRevalidationClient,
} from 'services/server'
import { BossNotificationEvent } from 'services'
import { getGuildPermalink, isDevelopment } from 'utils'
import {
  avatar,
  BOSS_CHECK_STATISTICS_CACHE,
  guildValidationRules,
  routes,
} from 'Constants'
import type {
  GUILD_MEMBER_ROLE,
  GuildApplication,
  GuildMember,
} from '@prisma/client'
import { multipleSpawnLocationBosses } from '../../modules/BossHunting/bossInfo'
import {
  bossSet,
  utils as blacklistUtils,
} from '../../modules/BossHunting/blacklist'
import { HuntingGroupStatistics } from '../../modules/BossHunting/modules/HuntingGroups/contexts/types'
import { can } from './permissions'

type UniqueMemberArgs = (
  | { id: string; guildId?: never; userId?: never }
  | { id?: never; guildId: string; userId: string }
) & { EXEVO_PAN_ADMIN?: boolean }

const findGuildMember = async ({
  id,
  guildId,
  userId,
}: UniqueMemberArgs): Promise<GuildMember> => {
  const member = await prisma.guildMember.findUnique({
    where: {
      id,
      guildId_userId: guildId ? { guildId, userId } : undefined,
    },
  })

  if (!member) {
    throw new TRPCError({
      code: 'NOT_FOUND',
      message: 'Guild member not found',
    })
  }

  return member
}

const throwIfForbiddenGuildRequest = async ({
  guildId,
  requesterId,
  EXEVO_PAN_ADMIN = false,
}: {
  guildId: string
  requesterId: string
  EXEVO_PAN_ADMIN?: boolean
}) => {
  const guild = await prisma.guild.findUnique({
    where: { id: guildId },
    include: { guildMembers: { include: { user: true } } },
  })

  if (!guild) {
    throw new TRPCError({
      code: 'NOT_FOUND',
      message: `Guild [${guildId}] not found`,
    })
  }

  const requesterMember = guild.guildMembers.find(
    ({ userId }) => userId === requesterId,
  )

  if (!requesterMember && !EXEVO_PAN_ADMIN) {
    throw new TRPCError({
      code: 'UNAUTHORIZED',
      message: 'Insufficient privileges in this guild',
    })
  }

  const hasProMember = guild.guildMembers.some(
    ({ user: { proStatus } }) => proStatus,
  )

  return {
    guild,
    requesterMember,
    hasProMember,
    isEditor: requesterMember
      ? can[requesterMember.role].editGuild
      : EXEVO_PAN_ADMIN,
    canManageApplications: requesterMember
      ? can[requesterMember.role].manageApplications
      : EXEVO_PAN_ADMIN,
  }
}

export const createGuild = authedProcedure
  .input(
    z.object({
      name: z
        .string()
        .min(guildValidationRules.name.MIN)
        .max(guildValidationRules.name.MAX),
      private: z.boolean(),
      server: z
        .string()
        .min(guildValidationRules.server.MIN)
        .max(guildValidationRules.server.MAX),
      description: z
        .string()
        .max(guildValidationRules.description.MAX)
        .nullable(),
      avatarId: z.number().min(avatar.id.min).max(avatar.id.max),
      avatarDegree: z.number().min(avatar.degree.min).max(avatar.degree.max),
    }),
  )
  .mutation(
    async ({
      ctx: {
        token: { id, name, proStatus },
      },
      input: { name: guildName, description, server, ...guildData },
    }) => {
      const result = await prisma.guild.create({
        data: {
          ...guildData,
          name: guildName.trim(),
          description: description?.trim(),
          server: server.trim(),
          private: proStatus ? guildData.private : false,
          guildMembers: {
            create: {
              userId: id,
              name,
              role: 'ADMIN',
            },
          },
        },
      })

      await PageRevalidationClient.revalidatePage(
        routes.BOSSES.HUNTING_GROUPS,
      ).catch(console.log)

      return result
    },
  )

export const updateGuild = authedProcedure
  .input(
    z.object({
      guildId: z.string(),
      name: z
        .string()
        .min(guildValidationRules.name.MIN)
        .max(guildValidationRules.name.MAX)
        .optional(),
      private: z.boolean().optional(),
      server: z
        .string()
        .min(guildValidationRules.server.MIN)
        .max(guildValidationRules.server.MAX)
        .optional(),
      description: z
        .string()
        .max(guildValidationRules.description.MAX)
        .optional(),
      messageBoard: z
        .string()
        .max(guildValidationRules.messageBoard.MAX)
        .optional(),
      avatarId: z.number().min(avatar.id.min).max(avatar.id.max).optional(),
      avatarDegree: z
        .number()
        .min(avatar.degree.min)
        .max(avatar.degree.max)
        .optional(),
      eventEndpoint: z.string().optional(),
    }),
  )
  .mutation(async ({ ctx: { token }, input }) => {
    const EXEVO_PAN_ADMIN = token.role === 'ADMIN'
    const { guildId, name, description, messageBoard, server, ...guildData } =
      input

    const { guild, hasProMember, isEditor } =
      await throwIfForbiddenGuildRequest({
        guildId,
        requesterId: token.id,
        EXEVO_PAN_ADMIN,
      })

    if (!isEditor && !EXEVO_PAN_ADMIN) {
      throw new TRPCError({
        code: 'FORBIDDEN',
        message: 'Insufficient privileges to edit information from this guild',
      })
    }

    const isUpdatingGuildPrivacy = guildData.private !== guild.private
    if (
      isUpdatingGuildPrivacy &&
      guildData.private &&
      !hasProMember &&
      !EXEVO_PAN_ADMIN
    ) {
      throw new TRPCError({
        code: 'FORBIDDEN',
        message: 'PRO_REQUIRED',
      })
    }

    const result = prisma.guild.update({
      where: { id: guildId },
      data: {
        ...guildData,
        name: name?.trim(),
        description: description?.trim(),
        messageBoard: messageBoard?.trim(),
        server: server?.trim(),
      },
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
          orderBy: { createdAt: 'desc' },
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

export const manageGuildMemberRole = authedProcedure
  .input(
    z.object({
      managedGuildMemberId: z.string(),
      role: z.union([
        z.literal<GUILD_MEMBER_ROLE>('MODERATOR'),
        z.literal<GUILD_MEMBER_ROLE>('USER'),
      ]),
    }),
  )
  .mutation(async ({ ctx: { token }, input }) => {
    const { managedGuildMemberId, role } = input
    const EXEVO_PAN_ADMIN = token.role === 'ADMIN'
    const managedMember = await findGuildMember({ id: managedGuildMemberId })

    if (!EXEVO_PAN_ADMIN) {
      const requesterMember = await findGuildMember({
        guildId: managedMember.guildId,
        userId: token.id,
      })

      if (!can[requesterMember.role].manageRoles) {
        throw new TRPCError({
          code: 'FORBIDDEN',
          message:
            'Insufficient privileges change a member role from this guild',
        })
      }
    }

    const result = prisma.guildMember.update({
      where: { id: managedMember.id },
      data: { role },
    })

    return result
  })

export const excludeGuildMember = authedProcedure
  .input(
    z.object({
      excludedGuildMemberId: z.string(),
    }),
  )
  .mutation(async ({ ctx: { token }, input: { excludedGuildMemberId } }) => {
    const EXEVO_PAN_ADMIN = token.role === 'ADMIN'

    const excludedMember = await findGuildMember({ id: excludedGuildMemberId })

    const allMembers = await prisma.guildMember.findMany({
      where: { guildId: excludedMember.guildId },
      orderBy: { joinedAt: 'asc' },
    })

    const requesterMember = allMembers.find(({ userId }) => userId === token.id)

    if (!requesterMember && !EXEVO_PAN_ADMIN) {
      throw new TRPCError({
        code: 'FORBIDDEN',
        message:
          'You are not allowed to leave/kick from a guild you are not member of',
      })
    }

    const isSelfExcluding = requesterMember?.id === excludedMember.id
    const guildWillDisband = allMembers.length === 1
    const [newElectedAdmin] = allMembers.filter(
      ({ id }) => id !== excludedMember.id,
    )

    if (isSelfExcluding || EXEVO_PAN_ADMIN) {
      if (guildWillDisband) {
        await prisma.guild.delete({ where: { id: excludedMember.guildId } })

        return excludedMember
      }

      if (excludedMember.role === 'ADMIN') {
        await prisma.$transaction([
          prisma.guildMember.delete({ where: { id: excludedMember.id } }),
          prisma.guildMember.update({
            where: { id: newElectedAdmin.id },
            data: { role: 'ADMIN' },
          }),
          prisma.guildLogEntry.create({
            data: {
              type: 'LEAVE_MEMBER',
              guildId: excludedMember.guildId,
              metadata: excludedMember.name,
            },
          }),
        ])

        return excludedMember
      }

      const [result] = await prisma.$transaction([
        prisma.guildMember.delete({ where: { id: excludedMember.id } }),
        prisma.guildLogEntry.create({
          data: {
            type: 'LEAVE_MEMBER',
            guildId: excludedMember.guildId,
            metadata: excludedMember.name,
          },
        }),
      ])

      return result
    }

    if (!can[requesterMember?.role ?? 'USER'].exclude(excludedMember.role)) {
      throw new TRPCError({
        code: 'FORBIDDEN',
        message: `The role [${
          requesterMember?.role ?? 'USER'
        }] has insufficient privileges to exclude a guild member with the role [${
          excludedMember.role
        }]`,
      })
    }

    const [result] = await prisma.$transaction([
      prisma.guildMember.delete({ where: { id: excludedMember.id } }),
      prisma.guildLogEntry.create({
        data: {
          type: 'KICK_MEMBER',
          guildId: excludedMember.guildId,
          actionGuildMemberId: requesterMember?.id,
          metadata: excludedMember.name,
        },
      }),
    ])

    return result
  })

export const changeGuildMemberName = authedProcedure
  .input(
    z.object({
      guildMemberId: z.string(),
      name: z
        .string()
        .min(guildValidationRules.name.MIN)
        .max(guildValidationRules.name.MAX),
    }),
  )
  .mutation(async ({ ctx: { token }, input: { guildMemberId, name } }) => {
    const EXEVO_PAN_ADMIN = token.role === 'ADMIN'
    const managedGuildMember = await findGuildMember({ id: guildMemberId })

    if (managedGuildMember.userId !== token.id && !EXEVO_PAN_ADMIN) {
      throw new TRPCError({
        code: 'FORBIDDEN',
        message:
          'You are not allowed to change the name of other guild members',
      })
    }

    const result = await prisma.guildMember.update({
      where: { id: guildMemberId },
      data: { name },
    })

    return result
  })

export const changeGuildMemberPreferences = authedProcedure
  .input(
    z.object({
      guildMemberId: z.string(),
      disabledNotifications: z.boolean(),
      blacklistedBosses: z.string(),
    }),
  )
  .mutation(
    async ({
      ctx: { token },
      input: { guildMemberId, disabledNotifications, blacklistedBosses },
    }) => {
      const managedGuildMember = await findGuildMember({ id: guildMemberId })

      if (managedGuildMember.userId !== token.id) {
        throw new TRPCError({
          code: 'FORBIDDEN',
          message:
            'You are not allowed to change preferences of other guild members',
        })
      }

      const blacklistedBossesSet = blacklistUtils.split(blacklistedBosses)
      blacklistedBossesSet.forEach((boss) => {
        if (!bossSet.has(boss)) {
          throw new TRPCError({
            code: 'BAD_REQUEST',
            message: `Unexpected '${boss}' boss blacklist entry`,
          })
        }
      })

      const result = await prisma.guildMember.update({
        where: { id: guildMemberId },
        data: { disabledNotifications, blacklistedBosses },
      })

      return result
    },
  )

export const applyToGuild = authedProcedure
  .input(
    z.object({
      guildId: z.string(),
      applyAs: z
        .string()
        .min(guildValidationRules.name.MIN)
        .max(guildValidationRules.name.MAX),
      message: z.string().max(guildValidationRules.applyMessage.MAX).optional(),
    }),
  )
  .mutation(async ({ ctx: { token }, input: { guildId, ...applyData } }) => {
    const userId = token.id
    const guildId_userId = { guildId, userId }

    const isMemberAlready = !!(await prisma.guildMember.findUnique({
      where: { guildId_userId },
    }))

    if (isMemberAlready) {
      throw new TRPCError({
        code: 'BAD_REQUEST',
        message: 'You are already a member of this guild',
      })
    }

    const result = await prisma.guildApplication.upsert({
      where: { guildId_userId },
      create: { ...applyData, ...guildId_userId },
      update: { ...applyData, createdAt: new Date() },
    })

    return result
  })

export const manageGuildApplication = authedProcedure
  .input(
    z.object({
      applicationId: z.string(),
      accept: z.boolean(),
    }),
  )
  .mutation(
    async ({
      ctx: { token },
      input: { applicationId, accept },
    }): Promise<{
      newMember?: GuildMember
      application: GuildApplication
    }> => {
      const EXEVO_PAN_ADMIN = token.role === 'ADMIN'

      const guildApplication = await prisma.guildApplication.findUnique({
        where: { id: applicationId },
      })

      if (!guildApplication) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Guild application not found',
        })
      }

      const { applyAs, guildId, userId } = guildApplication
      const { requesterMember, canManageApplications } =
        await throwIfForbiddenGuildRequest({
          guildId,
          requesterId: token.id,
          EXEVO_PAN_ADMIN,
        })

      if (!EXEVO_PAN_ADMIN) {
        if (!canManageApplications) {
          throw new TRPCError({
            code: 'FORBIDDEN',
            message: `The role [${
              requesterMember?.role ?? 'USER'
            }] has insufficient privileges to manage guild applications`,
          })
        }
      }

      if (accept) {
        const [application, newMember] = await prisma.$transaction([
          prisma.guildApplication.delete({ where: { id: applicationId } }),
          prisma.guildMember.create({
            data: {
              name: applyAs,
              role: 'USER',
              guildId,
              userId,
              targetedLogEntry: {
                create: {
                  type: 'ACCEPT_MEMBER',
                  guildId,
                  actionGuildMemberId: requesterMember?.id,
                },
              },
            },
          }),
        ])

        return { newMember, application }
      }

      const [application] = await prisma.$transaction([
        prisma.guildApplication.delete({ where: { id: applicationId } }),
        prisma.guildLogEntry.create({
          data: {
            type: 'REJECT_MEMBER',
            guildId,
            actionGuildMemberId: requesterMember?.id,
            metadata: applyAs,
          },
        }),
      ])

      return { application }
    },
  )

export const notifyGuildMembers = authedProcedure
  .input(
    z.object({
      guildId: z.string(),
      boss: z.string(),
      location: z.string(),
    }),
  )
  .mutation(async ({ ctx: { token }, input: { guildId, boss, location } }) => {
    const requesterId = token.id

    const { guild, requesterMember } = await throwIfForbiddenGuildRequest({
      requesterId,
      guildId,
    })

    if (
      !multipleSpawnLocationBosses.isNameAndLocationValid({
        name: boss,
        location,
      })
    ) {
      throw new TRPCError({
        code: 'UNAUTHORIZED',
        message: 'Insufficient privileges in this guild',
      })
    }

    const displayedName = multipleSpawnLocationBosses.displayName({
      name: boss,
      location,
    })

    const members = await prisma.guildMember.findMany({
      where: { guildId, disabledNotifications: false },
      include: { user: { select: { NotificationDevice: true } } },
    })

    if (requesterMember) {
      await prisma.$transaction([
        prisma.guildLogEntry.create({
          data: {
            type: 'NOTIFICATION',
            guildId,
            actionGuildMemberId: requesterMember.id,
            metadata: displayedName,
          },
        }),
        prisma.bossCheck.upsert({
          where: { boss_guildId_location: { boss, guildId, location } },
          create: {
            guildId,
            memberId: requesterMember.id,
            boss,
            location,
            lastSpawned: new Date(),
          },
          update: { memberId: requesterMember.id, lastSpawned: new Date() },
        }),
      ])

      if (guild.eventEndpoint) {
        await BossNotificationEvent.postEvent({
          bossName: boss,
          displayedBossName: displayedName,
          guildName: guild.name,
          notifiedBy: requesterMember.name,
          server: guild.server,
          url: guild.eventEndpoint,
        })
      }
    }

    const result = await Promise.all(
      members
        .filter(
          ({ disabledNotifications, blacklistedBosses }) =>
            !disabledNotifications &&
            !blacklistUtils.split(blacklistedBosses ?? '').has(boss),
        )
        .map(({ user: { NotificationDevice } }) => NotificationDevice)
        .flat()
        .map((device) =>
          DeviceNotificationClient.notify({
            device,
            notification: {
              title: displayedName,
              body: guild.name,
              url: getGuildPermalink(guild.name, true),
            },
            deleteInvalidDevices: false,
          }).catch(console.log),
        ),
    )

    return result
  })

export const listGuildLog = authedProcedure
  .input(
    z.object({
      guildId: z.string(),
      pageSize: z.number().optional().default(20),
      pageIndex: z.number().optional().default(0),
    }),
  )
  .query(
    async ({ ctx: { token }, input: { guildId, pageIndex, pageSize } }) => {
      const userId = token.id
      const EXEVO_PAN_ADMIN = token.role === 'ADMIN'

      if (!EXEVO_PAN_ADMIN) {
        await findGuildMember({ guildId, userId })
      }

      const result = await prisma.guildLogEntry.findMany({
        where: { guildId },
        include: {
          actionGuildMember: { select: { name: true } },
          targetGuildMember: { select: { name: true } },
        },
        orderBy: { createdAt: 'desc' },
        take: pageSize,
        skip: pageIndex * pageSize,
      })

      return result
    },
  )

export const listGuildChecks = authedProcedure
  .input(
    z.object({
      guildId: z.string(),
      pageSize: z.number().optional().default(20),
      pageIndex: z.number().optional().default(0),
    }),
  )
  .query(
    async ({ ctx: { token }, input: { guildId, pageIndex, pageSize } }) => {
      const userId = token.id
      const EXEVO_PAN_ADMIN = token.role === 'ADMIN'

      if (!EXEVO_PAN_ADMIN) {
        await findGuildMember({ guildId, userId })
      }

      const result = await prisma.bossCheckLog.findMany({
        where: { guildId },
        include: {
          member: { select: { name: true } },
        },
        orderBy: { checkedAt: 'desc' },
        take: pageSize,
        skip: pageIndex * pageSize,
      })

      return result
    },
  )

export const markCheckedBoss = authedProcedure
  .input(
    z.object({
      guildId: z.string(),
      boss: z.string(),
      location: z.string().optional(),
      lastSpawned: z.date().nullish(),
    }),
  )
  .mutation(
    async ({
      ctx: { token },
      input: { guildId, boss, location = '', lastSpawned },
    }) => {
      const userId = token.id

      if (
        !multipleSpawnLocationBosses.isNameAndLocationValid({
          name: boss,
          location,
        })
      ) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: `Unexpected '${boss}' as a checked boss`,
        })
      }

      const requesterMember = await findGuildMember({ guildId, userId })

      if (lastSpawned && !can[requesterMember.role].markAsNoChance) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'Insufficient privileges to mark boss as no chance',
        })
      }

      const result = await prisma.$transaction([
        prisma.bossCheck.upsert({
          where: { boss_guildId_location: { boss, guildId, location } },
          create: {
            guildId,
            memberId: requesterMember.id,
            boss,
            lastSpawned,
            location,
          },
          update: { memberId: requesterMember.id, lastSpawned },
          include: { checkedBy: { select: { name: true } } },
        }),
        prisma.bossCheckLog.create({
          data: {
            guildId,
            memberId: requesterMember.id,
            boss,
            location,
          },
        }),
      ])

      return result
    },
  )

export const listCheckedBosses = authedProcedure
  .input(
    z.object({
      guildId: z.string(),
    }),
  )
  .query(async ({ ctx: { token }, input: { guildId } }) => {
    const EXEVO_PAN_ADMIN = token.role === 'ADMIN'
    const requesterId = token.id
    const isPro = token.proStatus

    const { guild } = await throwIfForbiddenGuildRequest({
      guildId,
      requesterId,
      EXEVO_PAN_ADMIN,
    })

    const result = await BossesClient.fetchCheckedBosses({
      guildId,
      isPro,
      server: guild.server,
    })

    return result
  })

const countEntries = (entries: HuntingGroupsStatisticsEntry[]): number =>
  entries.reduce((acc, { count }) => acc + count, 0)

const calculateStatisticsEntriesPercentages = (
  entries: HuntingGroupsStatisticsEntry[],
): HuntingGroupsStatisticsEntry[] => {
  const totalCheckCount = countEntries(entries)

  return entries.map(({ name, count }) => ({
    name,
    count,
    percentage: Math.ceil((count / totalCheckCount) * 100),
  }))
}

type Range = 'past' | 'current'

const getMonthRange = (whichRange: Range): { gte: Date; lte: Date } => {
  const currentMonthStart = stripTime()
  currentMonthStart.setUTCDate(1)

  const monthLimitRange = new Date(currentMonthStart)

  if (whichRange === 'current') {
    monthLimitRange.setUTCMonth(monthLimitRange.getUTCMonth() + 1)

    return { gte: currentMonthStart, lte: monthLimitRange }
  }

  monthLimitRange.setUTCMonth(monthLimitRange.getUTCMonth() - 1)

  return { gte: monthLimitRange, lte: currentMonthStart }
}

type BossCheckStatsArgs = {
  guildId: string
  month: Range
}

const getCheckStatsBy = {
  members: async ({
    guildId,
    month,
  }: BossCheckStatsArgs): Promise<HuntingGroupsStatisticsEntry[]> =>
    prisma.guildMember
      .findMany({
        where: { guildId },
        select: {
          name: true,
          _count: {
            select: {
              bossCheckLog: {
                where: { checkedAt: getMonthRange(month) },
              },
            },
          },
        },
        orderBy: { bossCheckLog: { _count: 'desc' } },
      })
      .then((entries) =>
        entries.map(({ name, _count: { bossCheckLog } }) => ({
          name,
          count: bossCheckLog,
          percentage: 0,
        })),
      )
      .then(calculateStatisticsEntriesPercentages),
  boss: async ({
    guildId,
    month,
  }: BossCheckStatsArgs): Promise<HuntingGroupsStatisticsEntry[]> =>
    prisma.bossCheckLog
      .groupBy({
        where: { guildId, checkedAt: getMonthRange(month) },
        by: ['boss', 'location'],
        _count: true,
        orderBy: { _count: { boss: 'desc' } },
      })
      .then((entries) =>
        entries.map(({ boss, location, _count }) => ({
          name: multipleSpawnLocationBosses.displayName({
            name: boss,
            location,
          }),
          count: _count,
          percentage: 0,
        })),
      )
      .then(calculateStatisticsEntriesPercentages),
}

const pastCachedBossCheckStatisticsId = {
  encode: ({ guildId, date }: { guildId: string; date: Date }) =>
    `${+date}@${guildId}`,
  decode: (id: string) => {
    const [timestamp, guildId] = id.split('@')

    return { guildId, date: new Date(+timestamp) }
  },
}

const getBossCheckStatistics = async (args: BossCheckStatsArgs) => {
  const { month, guildId } = args
  const { lte } = getMonthRange(month)

  const shouldBeCached = month === 'past' && !isDevelopment()
  const date_guildId = pastCachedBossCheckStatisticsId.encode({
    guildId,
    date: lte,
  })

  if (shouldBeCached) {
    const cachedData = await prisma.pastCachedBossCheckStatistics.findUnique({
      where: { date_guildId },
    })

    if (
      cachedData &&
      cachedData.version === BOSS_CHECK_STATISTICS_CACHE.version
    ) {
      return JSON.parse(cachedData.cachedResponse)
    }
  }

  const [boss, members] = await Promise.all([
    getCheckStatsBy.boss(args),
    getCheckStatsBy.members(args),
  ])

  const result = { boss, members }

  if (shouldBeCached) {
    const cachedResponse = JSON.stringify(result)
    await prisma.pastCachedBossCheckStatistics.upsert({
      where: { date_guildId },
      create: {
        date_guildId,
        cachedResponse,
        version: BOSS_CHECK_STATISTICS_CACHE.version,
      },
      update: {
        date_guildId,
        cachedResponse,
        version: BOSS_CHECK_STATISTICS_CACHE.version,
      },
    })

    await prisma.bossCheckLog.deleteMany({
      where: { guildId, checkedAt: { lte } },
    })
  }

  return result
}

export const getCheckStats = authedProcedure
  .input(
    z.object({
      guildId: z.string(),
    }),
  )
  .query(
    async ({
      ctx: { token },
      input: { guildId },
    }): Promise<HuntingGroupStatistics> => {
      const EXEVO_PAN_ADMIN = token.role === 'ADMIN'
      const requesterId = token.id

      await throwIfForbiddenGuildRequest({
        guildId,
        requesterId,
        EXEVO_PAN_ADMIN,
      })

      const cachedData = await prisma.cachedBossCheckStatistics.findUnique({
        where: { guildId },
      })

      const { version, MAX_AGE, MINIMUM_CACHE_ENTRIES } =
        BOSS_CHECK_STATISTICS_CACHE

      const isDev = isDevelopment()

      if (cachedData && !isDev) {
        const cacheAge = +new Date() - +cachedData.lastUpdated

        if (cachedData.version === version && cacheAge < MAX_AGE) {
          return JSON.parse(cachedData.cachedResponse)
        }
      }

      const [currentMonth, pastMonth] = await Promise.all([
        getBossCheckStatistics({ guildId, month: 'current' }),
        getBossCheckStatistics({ guildId, month: 'past' }),
      ])

      const entryCount =
        countEntries(currentMonth.members) + countEntries(pastMonth.members)

      if (entryCount >= MINIMUM_CACHE_ENTRIES && !isDev) {
        const freshData = JSON.stringify({ currentMonth, pastMonth })

        const data = { guildId, version, cachedResponse: freshData }
        await prisma.cachedBossCheckStatistics.upsert({
          where: { guildId },
          update: data,
          create: data,
        })
      }

      return { currentMonth, pastMonth }
    },
  )
