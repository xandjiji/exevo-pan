import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithProviders } from 'utils/test'
import { useForm } from '../../../contexts/Form'
import { FormValues } from '../../../contexts/Form/types'
import CharacterCard from '..'
import { mockedCharacterData } from './mock'

jest.mock('next/router', () => ({
  useRouter: () => ({ locale: 'en' }),
}))

jest.mock('../../../contexts/Form', () => ({
  useForm: jest.fn(),
}))

const mockedUseForm = useForm as jest.MockedFunction<typeof useForm>

window.HTMLElement.prototype.scrollTo = jest.fn()
window.HTMLElement.prototype.scrollIntoView = jest.fn()

const mockedFormValues = {
  selectedCharacter: mockedCharacterData,
  selectedDates: [],
  paymentMethod: 'TIBIA_COINS',
  email: 'my@email.com',
  paymentCharacter: 'Bubble',
  dispatch: jest.fn(),
} as unknown as FormValues

describe('<Checkout />', () => {
  beforeEach(() => {
    mockedUseForm.mockClear()
    mockedUseForm.mockImplementation(() => mockedFormValues)
  })

  test.todo('should render all elements for PIX payment')

  test.todo('should render all elements for TIBIA_COINS payment')

  test.todo('button should be disabled if empty/invalid fields')

  test.todo('should validate and submit')

  test.todo('should validate display error')
})
