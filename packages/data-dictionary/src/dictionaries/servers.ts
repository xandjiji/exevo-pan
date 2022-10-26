const PVP_TYPES = {
  OPTIONAL: 'Optional',
  OPEN: 'Open',
  RETRO: 'Retro Open',
  HARDCORE: 'Hardcore',
  RETRO_HARDCORE: 'Retro Hardcore',
} as const

const SERVER_LOCATIONS = {
  EUROPE: 'EU',
  NORTH_AMERICA: 'NA',
  SOUTH_AMERICA: 'BR',
} as const

export const servers = { PVP_TYPES, SERVER_LOCATIONS }
