import type { GUILD_MEMBER_ROLE } from '@prisma/client'

export const guildEditorRoles = new Set<GUILD_MEMBER_ROLE>([
  'ADMIN',
  'MODERATOR',
])
