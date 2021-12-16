// eslint-disable-next-line import/no-extraneous-dependencies
import * as faker from 'faker'
import { servers } from '../constants'
import { singleSampleFrom } from '../utils'

export const randomServerId = (): number =>
  faker.datatype.number({ min: servers.id.MIN, max: servers.id.MAX })

const randomServerLocation = (): ServerLocation =>
  singleSampleFrom(servers.locations)

const randomPvpType = (): PvpType => singleSampleFrom(servers.pvpTypes)

export const randomServer = (): ServerObject => ({
  battleye: faker.datatype.boolean(),
  experimental: faker.datatype.boolean(),
  serverId: randomServerId(),
  serverName: faker.address.cityName(),
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
