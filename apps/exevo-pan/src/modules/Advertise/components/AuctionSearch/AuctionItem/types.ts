export interface AuctionItemProps
  extends React.HTMLAttributes<HTMLButtonElement> {
  auctionId: number
  nickname: string
  level: number
  vocationId: number
  outfitId: string
}
