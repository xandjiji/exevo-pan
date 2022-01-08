export const requestTypeKeys = {
  items: 0,
  storeItems: 1,
  mounts: 2,
  storeMounts: 3,
  outfits: 4,
  storeOutfits: 5,
} as const

export type RequestTypes = keyof typeof requestTypeKeys

export type PostHtmlProps = {
  auctionId: number
  pageIndex: number
  type: RequestTypes
}
