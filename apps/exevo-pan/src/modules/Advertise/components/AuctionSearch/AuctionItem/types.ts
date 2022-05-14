export interface AuctionItemProps
  extends React.HTMLAttributes<HTMLButtonElement> {
  nickname: string
  level: number
  vocationId: number
  outfitId: string
}
