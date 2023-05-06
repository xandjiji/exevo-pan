type TCInvestedState = 'INVESTED' | 'NO_TC' | 'HIDDEN'

export const getTCState = (tcInvested: number): TCInvestedState =>
  tcInvested < 0 ? 'HIDDEN' : tcInvested === 0 ? 'NO_TC' : 'INVESTED'
