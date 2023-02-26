import { createContext, useContext, useState } from 'react'
import type { GuildMember, Guild, GuildApplication } from '@prisma/client'
import { can } from 'server/guild/permissions'

export type ServerSideGuildDataProps = {
  currentMember?: GuildMember
  guild: Guild & {
    guildMembers: GuildMember[]
    guildApplications: GuildApplication[]
  }
  memberCount: number
}

type UseGuildDataProps = ServerSideGuildDataProps & {
  children: JSX.Element | JSX.Element[]
}

type GuildDataValues = {
  isMember: boolean
  isEditor: boolean
  isAdmin: boolean
  setGuildData: React.Dispatch<React.SetStateAction<ServerSideGuildDataProps>>
} & Omit<UseGuildDataProps, 'children'>

const GuildDataContext = createContext<GuildDataValues>({} as GuildDataValues)

export const GuildDataConsumer = GuildDataContext.Consumer

export const GuildDataProvider = ({
  children,
  ...propData
}: UseGuildDataProps) => {
  const [guildData, setGuildData] = useState<ServerSideGuildDataProps>(propData)

  const [inferredData] = useState({
    isAdmin: guildData.currentMember
      ? guildData.currentMember.role === 'ADMIN'
      : false,
    isMember: !!guildData.currentMember,
    isEditor: guildData.currentMember
      ? can[guildData.currentMember.role].editGuild
      : false,
  })

  return (
    <GuildDataContext.Provider
      value={{ ...guildData, ...inferredData, setGuildData }}
    >
      {children}
    </GuildDataContext.Provider>
  )
}

export const useGuildData = (): GuildDataValues => useContext(GuildDataContext)
