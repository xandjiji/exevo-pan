type LabelType =
  | (Pick<CharacterObject, 'hasBeenBidded'> & { label?: never })
  | {
      label: string
      hasBeenBidded?: never
    }

export type AuctionBidProps = {
  past?: boolean
  currentBid: number | string
} & LabelType
