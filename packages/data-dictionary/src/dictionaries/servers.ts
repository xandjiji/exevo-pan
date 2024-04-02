const PVP_TYPES = {
  OPTIONAL: { string: 'Optional', type: 0 } as PvpType,
  OPEN: { string: 'Open', type: 1 } as PvpType,
  RETRO: { string: 'Retro Open', type: 2 } as PvpType,
  HARDCORE: { string: 'Hardcore', type: 3 } as PvpType,
  RETRO_HARDCORE: { string: 'Retro Hardcore', type: 4 } as PvpType,
}

const SERVER_LOCATIONS = {
  EUROPE: { string: 'EU', type: 0 } as ServerLocation,
  NORTH_AMERICA: { string: 'NA', type: 1 } as ServerLocation,
  SOUTH_AMERICA: { string: 'BR', type: 2 } as ServerLocation,
  OCEANIA: { string: 'OCE', type: 3 } as ServerLocation,
}

export const servers = { PVP_TYPES, SERVER_LOCATIONS }
