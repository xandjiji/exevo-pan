// eslint-disable-next-line import/no-extraneous-dependencies
import * as faker from 'faker'
import { singleSampleFrom } from '../utils'

const MIN_SERVER_ID = 0
const MAX_SERVER_ID = 99

export const randomServerId = (): number =>
  faker.datatype.number({ min: MIN_SERVER_ID, max: MAX_SERVER_ID })

const randomServerLocation = (): ServerLocation => {
  const possibleLocations: ServerLocation[] = [
    { string: 'BR', type: 2 },
    { string: 'EU', type: 0 },
    { string: 'NA', type: 1 },
  ]

  return singleSampleFrom(possibleLocations)
}

const randomPvpType = (): PvpType => {
  const possiblePvps: PvpType[] = [
    { string: 'Hardcore', type: 3 },
    { string: 'Open', type: 1 },
    { string: 'Optional', type: 0 },
    { string: 'Retro Hardcore', type: 4 },
    { string: 'Retro Open', type: 2 },
  ]

  return singleSampleFrom(possiblePvps)
}

export const randomServer = (): ServerObject => ({
  battleye: faker.datatype.boolean(),
  experimental: faker.datatype.boolean(),
  serverId: randomServerId(),
  serverName: faker.name.lastName(),
  serverLocation: randomServerLocation(),
  pvpType: randomPvpType(),
})

export const randomServerList = (amount: number): ServerObject[] => {
  const serverArray: ServerObject[] = []
  while (serverArray.length < amount) {
    const newServer = randomServer()
    if (
      !serverArray.some((server) => server.serverName === newServer.serverName)
    )
      serverArray.push(newServer)
  }
  return serverArray
    .sort((a, b) => a.serverName.localeCompare(b.serverName))
    .map((server, index) => ({ ...server, serverId: index }))
}

export const randomServerData = (
  amount: number,
): {
  rawServerData: Record<string, ServerObject>
  serverList: ServerObject[]
} => {
  const serverList = randomServerList(amount)

  const rawServerData = {} as Record<string, ServerObject>

  serverList.forEach((server) => {
    rawServerData[server.serverName] = server
  })

  return { rawServerData, serverList }
}
