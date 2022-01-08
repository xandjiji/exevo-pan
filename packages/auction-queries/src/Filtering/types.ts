export type AuctionTest = (auction: CharacterObject) => boolean

export type FilterCharactersOptions = {
  auctions: CharacterObject[]
  filters: FilterOptions
}
