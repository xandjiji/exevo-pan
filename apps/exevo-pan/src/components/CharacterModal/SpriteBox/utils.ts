import { memoize } from 'utils'

export const addonCheck = {
  first: memoize((type: number): boolean => type === 1 || type === 3),
  second: memoize((type: number): boolean => type === 2 || type === 3),
}
