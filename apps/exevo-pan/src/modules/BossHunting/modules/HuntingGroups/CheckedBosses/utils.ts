import { getDateRelativeToSS } from 'shared-utils/dist/time'

export const isFromSameServerSave = (a = new Date(), b = new Date()): boolean =>
  getDateRelativeToSS(a).toISOString() === getDateRelativeToSS(b).toISOString()
