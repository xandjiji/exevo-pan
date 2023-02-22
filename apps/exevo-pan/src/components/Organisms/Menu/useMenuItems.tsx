import { useMemo } from 'react'
import { Item } from './types'

export const useMenuItems = (items: Array<Item | false>): Item[] =>
  useMemo(() => items.filter(Boolean) as Item[], [])
