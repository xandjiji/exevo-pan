import { randomDataset } from 'utils/test'

const {
  warStatistics: { onlineCount },
} = randomDataset()

export const mockDataGuildA = onlineCount.guildA.map((dataItem) => ({
  value: dataItem.count,
  timeStamp: dataItem.timeStamp,
}))

export const mockDataGuildB = onlineCount.guildA.map((dataItem) => ({
  value: dataItem.count,
  timeStamp: dataItem.timeStamp,
}))
