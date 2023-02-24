import type { GUILD_MEMBER_ROLE } from '@prisma/client'

type PermissionSet = {
  exclude: (role: GUILD_MEMBER_ROLE) => boolean
  editGuild: boolean
}

export const can: Record<GUILD_MEMBER_ROLE, PermissionSet> = {
  ADMIN: {
    exclude: (role) =>
      new Set<GUILD_MEMBER_ROLE>(['MODERATOR', 'USER']).has(role),
    editGuild: true,
  },
  MODERATOR: {
    exclude: (role) => new Set<GUILD_MEMBER_ROLE>(['USER']).has(role),
    editGuild: true,
  },
  USER: {
    exclude: (role) => new Set<GUILD_MEMBER_ROLE>([]).has(role),
    editGuild: false,
  },
}
