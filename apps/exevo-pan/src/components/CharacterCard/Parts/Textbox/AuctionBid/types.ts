export type AuctionBidProps = {
  past?: boolean
} & Pick<CharacterObject, 'hasBeenBidded' | 'currentBid'>
