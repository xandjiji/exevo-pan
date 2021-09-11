import { randomDataset } from 'utils/test'

const {
  warStatistics: { top10Kills },
} = randomDataset()

export const mockCharacterList = top10Kills.guildA
