import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithProviders } from 'utils/test'
import { useForm } from '../../../contexts/Form'
import { FormValues } from '../../../contexts/Form/types'
import CharacterCard from '..'
import { mockedCharacterData } from './mock'

jest.mock('../../../contexts/Form', () => ({
  useForm: jest.fn(),
}))

const mockedUseForm = useForm as jest.MockedFunction<typeof useForm>

window.HTMLElement.prototype.scrollTo = jest.fn()
window.HTMLElement.prototype.scrollIntoView = jest.fn()

const mockedFormValues = {
  selectedCharacter: mockedCharacterData,
  currentStep: 0,
  isValid: true,
  dispatch: jest.fn(),
  finished: false,
} as unknown as FormValues

describe('<CharacterCard />', () => {
  beforeEach(() => {
    mockedUseForm.mockClear()
    mockedUseForm.mockImplementation(() => mockedFormValues)
  })

  test('if no character is selected, the skeleton should be displayed', () => {
    const { rerender } = renderWithProviders(<CharacterCard />)

    const cardElement = screen.getByText(mockedCharacterData.nickname)
    expect(cardElement).toBeInTheDocument()

    mockedUseForm.mockImplementation(() => ({
      ...mockedFormValues,
      selectedCharacter: undefined,
    }))
    rerender(<CharacterCard />)

    expect(cardElement).not.toBeInTheDocument()
  })

  test('isValid should control button enable/disable', () => {
    const { rerender } = renderWithProviders(<CharacterCard />)

    const nextButton = screen.getByRole('button', { name: 'Next' })
    expect(nextButton).toBeEnabled()

    mockedUseForm.mockImplementation(() => ({
      ...mockedFormValues,
      isValid: false,
    }))

    rerender(<CharacterCard />)
    expect(nextButton).toBeDisabled()
  })

  test('button should dispatch SET_STEP', () => {
    renderWithProviders(<CharacterCard />)

    userEvent.click(screen.getByRole('button', { name: 'Next' }))
    expect(mockedFormValues.dispatch).toBeCalledTimes(1)
  })

  test('after the second step, the next button should NOT render', () => {
    const { rerender } = renderWithProviders(<CharacterCard />)

    const nextButton = screen.getByRole('button', { name: 'Next' })
    expect(nextButton).toBeInTheDocument()

    mockedUseForm.mockImplementation(() => ({
      ...mockedFormValues,
      currentStep: 1,
    }))
    rerender(<CharacterCard />)
    expect(nextButton).toBeInTheDocument()

    mockedUseForm.mockImplementation(() => ({
      ...mockedFormValues,
      currentStep: 2,
    }))
    rerender(<CharacterCard />)
    expect(nextButton).not.toBeInTheDocument()
  })

  test('if finished, it should not render', () => {
    mockedUseForm.mockImplementation(() => ({
      ...mockedFormValues,
      finished: true,
    }))

    const { container } = renderWithProviders(<CharacterCard />)

    expect(container.childElementCount).toEqual(1)
  })
})
