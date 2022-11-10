import { servers } from 'data-dictionary/dist/dictionaries/servers'

export default {
  id: {
    min: 0,
    max: 99,
  },
  locations: Object.values(servers.SERVER_LOCATIONS),
  pvpTypes: Object.values(servers.PVP_TYPES),
}
