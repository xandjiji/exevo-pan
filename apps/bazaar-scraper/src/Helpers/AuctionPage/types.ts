import { RequestTypes } from 'services/httpClient/types'

export type CharacterPostData = Pick<
  PartialCharacterObject,
  'storeItems' | 'outfits' | 'storeOutfits' | 'mounts' | 'storeMounts'
>

export const readableTypes: Record<RequestTypes, string> = {
  items: 'items',
  storeItems: 'store items',
  mounts: 'mounts',
  storeMounts: 'store mounts',
  outfits: 'outfits',
  storeOutfits: 'store outfits',
} as const

export type HistoryCheck =
  | { result: 'NOT_FOUND'; data: null }
  | { result: 'NOT_FINISHED'; data: UnfinishedAuction }
  | { result: 'IS_FINISHED'; data: CharacterObject }

export type RawCheck =
  | { result: 'NOT_FOUND'; data: null }
  | { result: 'NOT_FINISHED'; data: UnfinishedAuction }
  | { result: 'IS_FINISHED'; data: RawAuction }
