import { createContext, useContext, useState } from 'react'
import type { GuildMember, Guild } from '@prisma/client'
import { guildEditorRoles } from 'Constants'

export type ServerSideGuildDataProps = {
  currentMember?: GuildMember
  guild: Guild & { guildMembers: GuildMember[] }
  memberCount: number
}

type UseGuildDataProps = ServerSideGuildDataProps & {
  children: JSX.Element | JSX.Element[]
}

type GuildDataValues = {
  isMember: boolean
  isEditor: boolean
  isAdmin: boolean
} & Omit<UseGuildDataProps, 'children'>

const GuildDataContext = createContext<GuildDataValues>({} as GuildDataValues)

export const GuildDataConsumer = GuildDataContext.Consumer

export const GuildDataProvider = ({
  currentMember,
  children,
  ...propData
}: UseGuildDataProps) => {
  const [inferredData] = useState({
    isAdmin: currentMember ? currentMember.role === 'ADMIN' : false,
    isMember: !!currentMember,
    isEditor: currentMember ? guildEditorRoles.has(currentMember.role) : false,
  })

  return (
    <GuildDataContext.Provider value={{ ...propData, ...inferredData }}>
      {children}
    </GuildDataContext.Provider>
  )
}

export const useGuildData = (): GuildDataValues => useContext(GuildDataContext)
