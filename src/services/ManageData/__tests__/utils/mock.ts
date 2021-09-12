import { randomDataset } from 'utils/test'

const {
  minifiedCharacterData,
  partialCharacterData,
  miniPuneMembersData,
  puneMembersData,
} = randomDataset()

const past = +new Date() / 1000 - 100000
const future = +new Date() / 1000 + 100000

minifiedCharacterData[0][2] = past
export const pastMiniAuction = minifiedCharacterData[0]

minifiedCharacterData[1][2] = future
export const futureMiniAuction = minifiedCharacterData[1]

export const pastPartialAuction = {
  ...partialCharacterData[0],
  auctionEnd: past,
}

export const futurePartialAuction = {
  ...partialCharacterData[1],
  auctionEnd: future,
}

export const mockedMembersData = {
  miniPuneMembersData,
  puneMembersData,
}
