import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithProviders } from 'utils/test'
import { MailCheckoutClient } from 'services/client'
import { useForm } from '../../../contexts/Form'
import { FormValues } from '../../../contexts/Form/types'
import { validateEmail, validateCharacter } from '../utils'
import Checkout from '..'
import { mockedCharacterData } from './mock'

jest.mock('next/router', () => ({
  useRouter: () => ({ locale: 'en' }),
}))

jest.mock('../utils', () => ({
  validateEmail: jest.fn().mockImplementation(() => true),
  validateCharacter: jest.fn().mockImplementation(async () => true),
  randomCharacter: jest.fn().mockImplementation(() => 'Bubble'),
}))

const mockedValidateEmail = validateEmail as jest.MockedFunction<
  typeof validateEmail
>
const mockedValidateCharacter = validateCharacter as jest.MockedFunction<
  typeof validateCharacter
>

jest.mock('services/client', () => ({
  MailCheckoutClient: { postMail: jest.fn().mockResolvedValue('new-uuid') },
}))

const mockedMailCheckoutClient = MailCheckoutClient as jest.MockedClass<
  typeof MailCheckoutClient
>

jest.mock('../../../contexts/Form', () => ({
  useForm: jest.fn(),
}))

const mockedUseForm = useForm as jest.MockedFunction<typeof useForm>

const mockedFormValues = {
  uuid: '',
  currentStep: 2,
  selectedCharacter: mockedCharacterData,
  selectedDates: [] as string[],
  paymentMethod: 'TIBIA_COINS',
  email: { value: '', state: 'neutral' },
  paymentCharacter: { value: '', state: 'neutral' },
  isValid: true,
  finished: false,
  dispatch: jest.fn(),
} as FormValues

describe('<Checkout />', () => {
  beforeEach(() => {
    mockedUseForm.mockClear()
    mockedUseForm.mockImplementation(() => mockedFormValues)
  })

  test('should render all elements for PIX payment', () => {
    mockedUseForm.mockImplementation(() => ({
      ...mockedFormValues,
      paymentMethod: 'PIX',
    }))

    renderWithProviders(<Checkout />)

    expect(screen.getByLabelText('Email')).toBeInTheDocument()
    expect(
      screen.queryByLabelText('Sending coins character'),
    ).not.toBeInTheDocument()
  })

  test('should render all elements for TIBIA_COINS payment', () => {
    renderWithProviders(<Checkout />)

    expect(screen.getByLabelText('Email')).toBeInTheDocument()
    expect(screen.getByLabelText('Sending coins character')).toBeInTheDocument()
  })

  test('button should be disabled if empty fields', () => {
    renderWithProviders(<Checkout />)

    const buttonElement = screen.getByRole('button')

    expect(buttonElement).toBeDisabled()
  })

  test('button should be disabled if invalid fields', () => {
    mockedUseForm.mockImplementation(() => ({
      ...mockedFormValues,
      paymentCharacter: { value: 'Bubble', state: 'invalid' },
      email: { value: 'my@email.com', state: 'invalid' },
    }))
    renderWithProviders(<Checkout />)

    const buttonElement = screen.getByRole('button')

    expect(buttonElement).toBeDisabled()
  })

  test('button should be enabled if valid fields', () => {
    mockedUseForm.mockImplementation(() => ({
      ...mockedFormValues,
      paymentCharacter: { value: 'Bubble', state: 'valid' },
      email: { value: 'my@email.com', state: 'valid' },
    }))
    renderWithProviders(<Checkout />)

    const buttonElement = screen.getByRole('button')

    expect(buttonElement).not.toBeDisabled()
  })

  test('should validate and submit', async () => {
    mockedUseForm.mockImplementation(() => ({
      ...mockedFormValues,
      paymentCharacter: { value: 'Bubble', state: 'neutral' },
      email: { value: 'my@email.com', state: 'neutral' },
    }))
    renderWithProviders(<Checkout />)

    userEvent.click(screen.getByRole('button'))

    await waitFor(() => {
      expect(mockedValidateEmail).toHaveBeenCalledWith('my@email.com')
      expect(mockedValidateCharacter).toHaveBeenCalledWith('Bubble')
      expect(mockedMailCheckoutClient.postMail).toHaveBeenCalled()
    })
  })

  test('should validate and submit by typing ENTER', async () => {
    mockedUseForm.mockImplementation(() => ({
      ...mockedFormValues,
      paymentCharacter: { value: 'Bubble', state: 'neutral' },
      email: { value: 'my@email.com', state: 'neutral' },
    }))
    renderWithProviders(<Checkout />)

    userEvent.type(screen.getByLabelText('Email'), '{Enter}')

    await waitFor(() => {
      expect(mockedValidateEmail).toHaveBeenCalledWith('my@email.com')
      expect(mockedValidateCharacter).toHaveBeenCalledWith('Bubble')
      expect(mockedMailCheckoutClient.postMail).toHaveBeenCalled()
    })
  })

  test('on user input, should dispatch onChange', async () => {
    renderWithProviders(<Checkout />)

    userEvent.type(screen.getByLabelText('Email'), 'a')
    expect(mockedFormValues.dispatch).toHaveBeenLastCalledWith({
      type: 'SET_INPUT',
      values: {
        email: { value: 'a', state: 'neutral' },
      },
    })
  })
})
