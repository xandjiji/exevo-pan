import { ServerList } from 'Helpers'
import { ServerData } from 'Data'
import { broadcast, coloredText } from 'logging'
import { fetchServerPage } from './utils'

const main = async () => {
  const helper = new ServerList()
  const serverData = new ServerData()

  await serverData.load()

  broadcast('Synching Tibia servers data...', 'neutral')
  const serverPageHtml = await fetchServerPage()

  const freshServerData = helper.servers(serverPageHtml)
  const onlineCount = helper.serverOnlineCount(serverPageHtml)
  const savedServerNames = new Set(
    serverData.getAllServers().map(({ serverName }) => serverName),
  )

  freshServerData.forEach((freshServer) => {
    if (!savedServerNames.has(freshServer.serverName)) {
      serverData.registerServer(freshServer)
      broadcast(
        `New server (${coloredText(
          freshServer.serverName,
          'success',
        )}) was added...`,
        'highlight',
      )
    }
  })

  const activeServerList = freshServerData.map(({ serverName }) => serverName)
  await serverData.saveActiveServers(activeServerList)

  const activeServerSet = new Set(activeServerList)

  const serverList = serverData.getAllServers()
  return {
    serverList,
    activeServers: serverList.filter(({ serverName }) =>
      activeServerSet.has(serverName),
    ),
    onlineCount,
  }
}

export default main
