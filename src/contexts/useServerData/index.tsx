import { createContext, useContext, useState, useEffect } from 'react'
import { getFromLocalStorage } from 'utils'
import { ManageDataClient } from 'services'
import { ServerDataContextState } from './types'

const defaultServerDataState: ServerDataContextState = {
  loading: true,
  serverData: getFromLocalStorage<ServerObject[]>('serverData', []),
}
const ServerDataContext = createContext<ServerDataContextState>(
  defaultServerDataState,
)

export const ServerDataProvider: React.FC = ({ children }) => {
  const [loading, setLoading] = useState<boolean>(
    defaultServerDataState.loading,
  )
  const [serverData, setServerData] = useState(
    defaultServerDataState.serverData,
  )

  useEffect(() => {
    const fetchData = async () => {
      try {
        const serverArray = await ManageDataClient.fetchServerData()
        setServerData(serverArray)
      } finally {
        setLoading(false)
      }
    }
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    fetchData()
  }, [])

  return (
    <ServerDataContext.Provider
      value={{
        loading,
        serverData,
      }}
    >
      {children}
    </ServerDataContext.Provider>
  )
}

export const useServerData = (): ServerDataContextState =>
  useContext(ServerDataContext)
