export const pluckTCInvested = (auction: CharacterObject): CharacterObject =>
  auction.tcInvested > 0 ? { ...auction, tcInvested: -1 } : auction
