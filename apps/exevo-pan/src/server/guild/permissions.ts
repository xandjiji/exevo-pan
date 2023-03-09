import type { GUILD_MEMBER_ROLE } from '@prisma/client'

type PermissionSet = {
  exclude: (role: GUILD_MEMBER_ROLE) => boolean
  editGuild: boolean
  manageApplications: boolean
  manageRoles: boolean
}

export const can: Record<GUILD_MEMBER_ROLE, PermissionSet> = {
  ADMIN: {
    exclude: (role) =>
      new Set<GUILD_MEMBER_ROLE>(['MODERATOR', 'USER']).has(role),
    editGuild: true,
    manageApplications: true,
    manageRoles: true,
  },
  MODERATOR: {
    exclude: (role) => new Set<GUILD_MEMBER_ROLE>(['USER']).has(role),
    editGuild: true,
    manageApplications: true,
    manageRoles: false,
  },
  USER: {
    exclude: (role) => new Set<GUILD_MEMBER_ROLE>([]).has(role),
    editGuild: false,
    manageApplications: false,
    manageRoles: false,
  },
}
