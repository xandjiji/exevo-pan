import { servers } from 'data-dictionary/dist/dictionaries/servers'

const pvpNames = Object.values(servers.PVP_TYPES).map(({ string }) => string)
const locationNames = Object.values(servers.SERVER_LOCATIONS).map(
  ({ string }) => string,
)

export const getInfo = {
  pvp: (type: number): PvpType['string'] => pvpNames[type],
  location: (type: number): ServerLocation['string'] => locationNames[type],
}
