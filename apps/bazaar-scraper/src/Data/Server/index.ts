import fs from 'fs/promises'
import { broadcast, coloredText } from 'logging'
import { file } from 'Constants'

const SERVER_DATA_PATH = file.SERVER_DATA.path
const SERVER_DATA_FILENAME = coloredText(file.SERVER_DATA.name, 'highlight')

const ACTIVE_SERVERS_PATH = file.ACTIVE_SERVERS.path
const ACTIVE_SERVERS_FILENAME = coloredText(
  file.ACTIVE_SERVERS.name,
  'highlight',
)

export default class ServerData {
  private serverList: ServerObject[] = []

  async load(): Promise<void> {
    broadcast(`Loading ${SERVER_DATA_FILENAME}...`, 'system')

    try {
      const data = await fs.readFile(SERVER_DATA_PATH, 'utf-8')
      this.serverList = Object.values(JSON.parse(data))
    } catch {
      broadcast(
        `Failed to load ${SERVER_DATA_FILENAME}, initializing a new one...`,
        'fail',
      )

      const newData: ServerObject[] = []
      await fs.writeFile(SERVER_DATA_PATH, JSON.stringify({}))
      this.serverList = newData
    }
  }

  private async save() {
    const serverObject: Record<string, ServerObject> = {}
    this.serverList.forEach((server) => {
      serverObject[server.serverName] = server
    })

    if (this.serverList.length === 0) {
      broadcast(
        `WARNING! Writing empty values to ${SERVER_DATA_FILENAME}`,
        'fail',
      )
    }

    await fs.writeFile(SERVER_DATA_PATH, JSON.stringify(serverObject))
  }

  public async saveActiveServers(activeServerNames: string[]): Promise<void> {
    if (activeServerNames.length === 0) {
      broadcast(
        `WARNING! Writing empty values to ${ACTIVE_SERVERS_FILENAME}`,
        'fail',
      )
    }

    await fs.writeFile(ACTIVE_SERVERS_PATH, JSON.stringify(activeServerNames))
  }

  public getAllServers(): ServerObject[] {
    return this.serverList
  }

  public getServerByName(name: string): ServerObject {
    const foundServer = this.serverList.find(
      ({ serverName }) => serverName === name,
    )

    if (!foundServer) throw Error(`Unknown server name: ${name}`)

    return foundServer
  }

  public getServerById(id: number): ServerObject {
    const foundServer = this.serverList.find(({ serverId }) => serverId === id)

    if (!foundServer) throw Error(`Unknown server id: ${id}`)

    return foundServer
  }

  public async registerServer(
    partialServer: PartialServerObject,
  ): Promise<void> {
    const newId = this.serverList.length
    this.serverList.push({
      ...partialServer,
      serverId: newId,
    })

    await this.save()
    broadcast(
      `New server '${partialServer.serverName}' was registered to ${SERVER_DATA_FILENAME}`,
      'success',
    )
  }
}
