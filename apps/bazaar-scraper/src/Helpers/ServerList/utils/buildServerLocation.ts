const serverLocations: Record<string, ServerLocation> = {
  EU: { string: 'EU', type: 0 },
  NA: { string: 'NA', type: 1 },
  BR: { string: 'BR', type: 2 },
}

export const buildServerLocation = (locationString: string): ServerLocation => {
  switch (locationString) {
    case 'Europe':
      return serverLocations.EU

    case 'North America':
      return serverLocations.NA

    case 'South America':
      return serverLocations.BR

    default:
      throw Error(`Unknown server location: ${locationString}`)
  }
}
