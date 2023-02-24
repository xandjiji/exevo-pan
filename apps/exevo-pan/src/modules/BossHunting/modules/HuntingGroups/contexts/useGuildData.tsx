import { createContext, useContext, useState } from 'react'
import type { GuildMember, Guild } from '@prisma/client'
import { can } from 'server/guild/permissions'

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
    isEditor: currentMember ? can[currentMember.role].editGuild : false,
  })

  return (
    <GuildDataContext.Provider
      value={{ ...propData, ...inferredData, currentMember }}
    >
      {children}
    </GuildDataContext.Provider>
  )
}

export const useGuildData = (): GuildDataValues => useContext(GuildDataContext)
