import * as faker from 'faker'
import { singleSampleFrom } from '../utils'
import { servers } from '../constants'

const randomServerLocation = () => singleSampleFrom(servers.locations)

const randomPvpType = () => singleSampleFrom(servers.pvpTypes)

export const randomServer = (): ServerObject => ({
  battleye: faker.datatype.boolean(),
  experimental: faker.datatype.boolean(),
  serverName: faker.address.cityName(),
  serverLocation: randomServerLocation(),
  pvpType: randomPvpType(),
  active: faker.datatype.boolean(),
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
