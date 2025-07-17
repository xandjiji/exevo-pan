import type { GUILD_MEMBER_ROLE } from 'db/prisma/generated/client'

type PermissionSet = {
  exclude: (role: GUILD_MEMBER_ROLE) => boolean
  editGuild: boolean
  manageApplications: boolean
  manageRoles: boolean
  markAsNoChance: boolean
}

export const can: Record<GUILD_MEMBER_ROLE, PermissionSet> = {
  ADMIN: {
    exclude: (role) =>
      new Set<GUILD_MEMBER_ROLE>(['MODERATOR', 'USER']).has(role),
    editGuild: true,
    manageApplications: true,
    manageRoles: true,
    markAsNoChance: true,
  },
  MODERATOR: {
    exclude: (role) => new Set<GUILD_MEMBER_ROLE>(['USER']).has(role),
    editGuild: true,
    manageApplications: true,
    manageRoles: false,
    markAsNoChance: true,
  },
  USER: {
    exclude: (role) => new Set<GUILD_MEMBER_ROLE>([]).has(role),
    editGuild: false,
    manageApplications: false,
    manageRoles: false,
    markAsNoChance: true,
  },
}
