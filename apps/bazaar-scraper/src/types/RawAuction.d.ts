declare type PageableAuctionData = {
  storeItems: string[]
  mounts: string[]
  storeMounts: string[]
  outfits: string[]
  storeOutfits: string[]
}

declare type RawAuction = {
  id: number
  html: string
  pageableData: PageableAuctionData
}
