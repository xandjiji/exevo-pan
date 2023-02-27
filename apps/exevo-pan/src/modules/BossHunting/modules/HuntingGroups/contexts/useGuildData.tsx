import {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
} from 'react'
import { can } from 'server/guild/permissions'
import { GuildDataValues, UseGuildDataProps } from './types'

export type { GuildData } from './types'

const GuildDataContext = createContext<GuildDataValues>({} as GuildDataValues)

export const GuildDataConsumer = GuildDataContext.Consumer

export const GuildDataProvider = ({
  children,
  token,
  ...initialState
}: UseGuildDataProps) => {
  const [guildData, setGuildDataState] = useState(initialState)

  return (
    <GuildDataContext.Provider
      value={{
        ...guildData,
        ...useMemo(() => {
          const currentMember = guildData.members.find(
            ({ userId }) => userId === token?.id,
          )

          return {
            currentMember,
            isMember: !!currentMember,
            isAdmin: currentMember?.role === 'ADMIN',
            isEditor: can[currentMember?.role ?? 'USER'].editGuild,
            isApprover: can[currentMember?.role ?? 'USER'].manageApplications,
          }
        }, [token, guildData]),
        setGuildData: useCallback((update) => {
          if (update instanceof Function) {
            setGuildDataState((current) => {
              const updatedPartialState = update(current)

              return { ...current, ...updatedPartialState }
            })
          } else {
            setGuildDataState((current) => ({ ...current, ...update }))
          }
        }, []),
      }}
    >
      {children}
    </GuildDataContext.Provider>
  )
}

export const useGuildData = (): GuildDataValues => useContext(GuildDataContext)
