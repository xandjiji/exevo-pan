import type { GuildMember, Guild, GuildApplication } from '@prisma/client'
import type { JWT } from 'next-auth/jwt'

export type GuildData = {
  guild: Guild
  members: GuildMember[]
  applications: GuildApplication[]
  checkedBosses: CheckedBoss[]
}

export type InferredValues = {
  currentMember?: GuildMember
  isMember: boolean
  isAdmin: boolean
  isEditor: boolean
  isApprover: boolean
  EXEVO_PAN_ADMIN: boolean
}

export type GuildDataValues = {
  setGuildData: (
    update:
      | Partial<GuildData>
      | ((currentGuildData: GuildData) => Partial<GuildData>),
  ) => void
} & InferredValues &
  GuildData

export type UseGuildDataProps = GuildData & {
  children: JSX.Element | JSX.Element[]
  token: JWT | null
}
