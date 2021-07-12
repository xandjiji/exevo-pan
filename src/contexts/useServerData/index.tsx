import { createContext, useContext, useState, useEffect } from 'react'
import { ManageDataClient } from 'services'
import { ServerDataContextState } from './types'

const defaultServerDataState: ServerDataContextState = {
  loading: true,
  serverData: [],
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
