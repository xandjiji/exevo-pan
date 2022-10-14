const SERVER_LOCATIONS: Record<string, ServerLocations> = {
  Europe: 'EU',
  'North America': 'NA',
  'South America': 'BR',
}

const PVP_TYPES: Record<string, PvpTypes> = {
  'Optional PvP': 'Optional',
  'Open PvP': 'Open',
  'Retro Open PvP': 'Retro Open',
  'Hardcore PvP': 'Hardcore',
  'Retro Hardcore PvP': 'Retro Hardcore',
}

export const parse = {
  serverLocation: (location: string): string => {
    const parsedLocation = SERVER_LOCATIONS[location]

    if (!parsedLocation) throw Error(`Unknown server location: ${location}`)
    return parsedLocation
  },
  pvpType: (pvpType: string): string => {
    const parsedPvpType = PVP_TYPES[pvpType]

    if (!parsedPvpType) throw Error(`Unknown PvP type: ${pvpType}`)
    return parsedPvpType
  },
}
