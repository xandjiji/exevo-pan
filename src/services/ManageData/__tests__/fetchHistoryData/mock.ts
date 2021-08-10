import { randomDataset } from 'utils/test'

const { partialCharacterData } = randomDataset()

export const mockedHashData = [123, 456, 789]

export const oldAuction = {
  ...partialCharacterData[0],
  auctionEnd: 1000000000,
}

export const normalAuction = {
  ...partialCharacterData[1],
  auctionEnd: 1626487200,
}

export const futureAuction = {
  ...partialCharacterData[2],
  auctionEnd: 9999999999,
}

export const sortedAuctions = [
  futureAuction,
  normalAuction,
  oldAuction,
] as PartialCharacterObject[]
