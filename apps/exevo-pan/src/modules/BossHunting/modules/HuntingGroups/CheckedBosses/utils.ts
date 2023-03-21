import { MILLISECONDS_IN } from 'utils'
import { getDateRelativeToSS } from 'shared-utils/dist/time'

export const isFromSameServerSave = (
  a = new Date(),
  b = new Date(),
): boolean => {
  if (+a - +b >= MILLISECONDS_IN.DAY) {
    return false
  }

  return getDateRelativeToSS(a) === getDateRelativeToSS(b)
}
