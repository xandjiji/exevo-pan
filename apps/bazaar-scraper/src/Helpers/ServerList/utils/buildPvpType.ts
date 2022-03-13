const pvpTypes: Record<string, PvpType> = {
  HARDCORE: { string: 'Hardcore', type: 3 },
  OPEN: { string: 'Open', type: 1 },
  OPTIONAL: { string: 'Optional', type: 0 },
  RETRO_HARDCORE: { string: 'Retro Hardcore', type: 4 },
  RETRO_OPEN: { string: 'Retro Open', type: 2 },
}

export const buildPvpType = (pvpTypeString: string): PvpType => {
  switch (pvpTypeString) {
    case 'Optional PvP':
      return pvpTypes.OPTIONAL

    case 'Open PvP':
      return pvpTypes.OPEN

    case 'Retro Open PvP':
      return pvpTypes.RETRO_OPEN

    case 'Hardcore PvP':
      return pvpTypes.HARDCORE

    case 'Retro Hardcore PvP':
      return pvpTypes.RETRO_HARDCORE

    default:
      throw Error(`Unknown server pvp type: ${pvpTypeString}`)
  }
}
