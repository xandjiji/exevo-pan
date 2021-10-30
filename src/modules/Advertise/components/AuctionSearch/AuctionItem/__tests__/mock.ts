import { randomDataset } from 'utils/test'

const { characterData } = randomDataset()
export const mockedRandomCharacter = characterData[0]

export const vocationEnum = {
  '0': 'None',
  '1': 'Elite Knight',
  '2': 'Royal Paladin',
  '3': 'Master Sorcerer',
  '4': 'Elder Druid',
  '10': 'None',
  '11': 'Knight',
  '12': 'Paladin',
  '13': 'Sorcerer',
  '14': 'Druid',
} as Record<string, string>
