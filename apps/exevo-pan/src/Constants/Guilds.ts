import type { GUILD_MEMBER_ROLE } from '@prisma/client'

export const guildEditorRoles = new Set<GUILD_MEMBER_ROLE>([
  'ADMIN',
  'MODERATOR',
])

export const guildValidationRules = {
  name: {
    MIN: 2,
    MAX: 32,
  },
  server: {
    MIN: 1,
    MAX: 32,
  },
  description: {
    MAX: 600,
  },
  messageBoard: {
    MAX: 2048,
  },
}
