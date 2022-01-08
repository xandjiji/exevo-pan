import { randomDataset } from 'utils/test'
import { FormValues } from '../../../contexts/Form/types'

const { characterData } = randomDataset()
const randomCharacter = characterData[0]

export const mockedFormValues = {
  selectedCharacter: randomCharacter,
  selectedDates: ['10/21/2021', '10/22/2021'],
  paymentMethod: 'PIX',
} as FormValues
