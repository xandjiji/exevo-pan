import { createContext, useContext, useState } from 'react'
import type { GuildMember, Guild, GUILD_MEMBER_ROLE } from '@prisma/client'

export type ServerSideGuildDataProps = {
  currentMember?: GuildMember
  guildMembers: GuildMember[]
  guild: Guild
  memberCount: number
}

type UseGuildDataProps = ServerSideGuildDataProps & {
  children: JSX.Element | JSX.Element[]
}

type GuildDataValues = {
  isMember: boolean
  isEditor: boolean
} & Omit<UseGuildDataProps, 'children'>

const GuildDataContext = createContext<GuildDataValues>({} as GuildDataValues)

const editorRoles = new Set<GUILD_MEMBER_ROLE>(['ADMIN', 'MODERATOR'])

export const GuildDataProvider = ({
  currentMember,
  children,
  ...propData
}: UseGuildDataProps) => {
  const [inferredData] = useState({
    isMember: !!currentMember,
    isEditor: currentMember ? editorRoles.has(currentMember.role) : false,
  })

  return (
    <GuildDataContext.Provider value={{ ...propData, ...inferredData }}>
      {children}
    </GuildDataContext.Provider>
  )
}

export const useGuildData = (): GuildDataValues => useContext(GuildDataContext)
