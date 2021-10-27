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
    mockedUseForm.mockImplementation(() => mockedFormValues)
  })

  test.todo('after the first step, it should have smaller style')

  test.todo('if no character is selected, the skeleton should be displayed')

  test.todo('if no character is selected, the skeleton should be displayed')

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

  test.todo('button should dispatch SET_STEP')

  test.todo('if finished, it should not render')
})
