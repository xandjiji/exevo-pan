import { ServerData } from 'Data'
import { broadcast, coloredText } from 'logging'
import { updateInactiveServers } from './tasks'
import { db, fetchServerPage, fetchActiveServers } from './utils'

const main = async (): Promise<void> => {
  const serverData = new ServerData()

  await serverData.load()
  const currentServerNames = serverData.getServerNamesSet()

  broadcast('Synching server data...', 'neutral')
  const [storedServers, freshServers] = await Promise.all([
    db.getAllServers(),
    fetchServerPage(),
  ])

  const inactiveServers = await updateInactiveServers({
    storedServers,
    freshServers,
  })

  if (inactiveServers) {
    broadcast(
      `Inactive servers (${coloredText(
        inactiveServers,
        'success',
      )}) were updated...`,
      'highlight',
    )
  }

  // register new servers

  newServerData.forEach((newServer) => {
    if (!currentServerNames.has(newServer.serverName)) {
      serverData.registerServer(newServer)
    }
  })

  broadcast('Fetching active server list...', 'neutral')
  const activeServerList = await fetchActiveServers()
  await serverData.saveActiveServers(activeServerList)
}

export default main
