import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithProviders } from 'utils/test'
import { RadioButton } from 'components/Atoms'
import RadioGroup from '..'

const mockedOnChange = jest.fn()

describe('<RadioGroup />', () => {
  beforeEach(() => {
    mockedOnChange.mockReset()
  })

  describe('renders children correctly', () => {
    test('RadioButtons as children', () => {
      renderWithProviders(
        <RadioGroup>
          <RadioButton />
          <RadioButton />
        </RadioGroup>,
      )

      expect(screen.queryAllByRole('radio')).toHaveLength(2)
    })

    test('html elements as children', () => {
      renderWithProviders(
        <RadioGroup>
          <div role="none" />
          <div role="none" />
        </RadioGroup>,
      )

      expect(screen.queryAllByRole('none')).toHaveLength(2)
    })

    test('html elements AND RadioButtons as children', () => {
      renderWithProviders(
        <RadioGroup>
          <RadioButton data-testid="child" />
          <div data-testid="child" />
        </RadioGroup>,
      )

      expect(screen.queryAllByTestId('child')).toHaveLength(2)
    })
  })

  test('should implicitly control its children', () => {
    renderWithProviders(
      <RadioGroup>
        <RadioButton />
        <RadioButton />
      </RadioGroup>,
    )

    const [radioA, radioB] = screen.getAllByRole('radio')

    expect(radioA).toBeChecked()
    expect(radioB).not.toBeChecked()
    userEvent.click(radioB)
    expect(radioA).not.toBeChecked()
    expect(radioB).toBeChecked()
    userEvent.click(radioA)
    expect(radioA).toBeChecked()
    expect(radioB).not.toBeChecked()
  })

  test('should be controlled', () => {
    renderWithProviders(
      <RadioGroup indexValue={0}>
        <RadioButton />
        <RadioButton />
      </RadioGroup>,
    )

    const [radioA, radioB] = screen.getAllByRole('radio')

    expect(radioA).toBeChecked()
    expect(radioB).not.toBeChecked()
    userEvent.click(radioB)
    expect(radioA).toBeChecked()
    expect(radioB).not.toBeChecked()
    userEvent.click(radioA)
    expect(radioA).toBeChecked()
    expect(radioB).not.toBeChecked()
  })

  test('should call onChange', () => {
    renderWithProviders(
      <RadioGroup onChange={mockedOnChange}>
        <RadioButton />
        <RadioButton />
      </RadioGroup>,
    )

    const [radioA, radioB] = screen.getAllByRole('radio')

    userEvent.click(radioB)
    expect(mockedOnChange).toBeCalledTimes(1)
    expect(mockedOnChange).toBeCalledWith(1)

    userEvent.click(radioA)
    expect(mockedOnChange).toBeCalledTimes(2)
    expect(mockedOnChange).toBeCalledWith(0)

    userEvent.click(radioA)
    expect(mockedOnChange).not.toBeCalledTimes(3)
  })
})
