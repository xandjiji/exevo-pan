import { randomDataset } from 'utils/test'

const {
  warStatistics: { lastDeaths },
} = randomDataset()

export const mockedFragsList = lastDeaths.guildA
