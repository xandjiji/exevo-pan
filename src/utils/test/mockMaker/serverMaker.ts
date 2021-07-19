import * as faker from 'faker'
import { singleSampleFrom } from './utils'

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
  serverId: faker.datatype.number({ min: 0, max: 99 }),
  serverName: faker.random.word().toLowerCase(),
  serverLocation: randomServerLocation(),
  pvpType: randomPvpType(),
})

export const randomServerList = (amount: number): ServerObject[] => {
  const serverArray: ServerObject[] = []
  while (serverArray.length < amount) {
    const newServer = randomServer()
    if (!serverArray.some(server => server.serverName === newServer.serverName))
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

  const rawServerData = {}
  for (const server of serverList) {
    rawServerData[server.serverName] = server
  }

  return { rawServerData, serverList }
}
