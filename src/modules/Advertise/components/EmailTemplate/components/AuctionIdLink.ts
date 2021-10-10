const AuctionIdLink = (id: string): string =>
  `<a style="font-size: 12px;letter-spacing: 1px;" href="https://www.tibia.com/charactertrade/?subtopic=currentcharactertrades&page=details&auctionid=${id}&source=overview" target="_blank" rel="noreferrer noopener">(#${id})</a>`

export default AuctionIdLink
