import { randomDataset } from 'utils/test'

const { characterData } = randomDataset()

const mockKsuData = characterData[0]

export const mockCharacterData = {
  characters: {
    data: {
      name: mockKsuData.nickname,
      level: mockKsuData.level,
      vocation: 'Elite Knight',
      world: 'Belobra',
    },
  },
}
