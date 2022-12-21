import { v4 as uuidv4 } from 'uuid'
import { randomDataset } from 'utils/test'
import { EmailTemplateProps } from '../types'

const { characterData } = randomDataset()

const mockedCharacterData = characterData[0]

export const mockedPixPurchaseData: EmailTemplateProps = {
  isPro: false,
  uuid: uuidv4(),
  selectedCharacter: mockedCharacterData,
  selectedDates: ['10/21/2021', '10/22/2021', '10/23/2021'],
  paymentMethod: 'PIX',
  paymentCharacter: 'Bubble',
  locale: 'en',
}

export const mockedTCPurchaseData: EmailTemplateProps = {
  isPro: true,
  uuid: uuidv4(),
  selectedCharacter: mockedCharacterData,
  selectedDates: ['10/21/2021'],
  paymentMethod: 'TIBIA_COINS',
  paymentCharacter: 'Bubble',
  locale: 'en',
}
