import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithProviders } from 'utils/test'
import { RadioButton } from 'components/Atoms'
import RadioGroup from '..'
import { indexToId } from '../utils'

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

      const radioButtons = screen.queryAllByRole('radio')

      expect(radioButtons).toHaveLength(2)
      radioButtons.forEach((radio, index) => {
        expect(radio).toHaveAttribute('id', indexToId(index))
      })
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

    const groupElement = screen.getByRole('radiogroup')
    const [radioA, radioB] = screen.getAllByRole('radio')

    expect(radioA).not.toBeChecked()
    expect(radioB).not.toBeChecked()
    expect(groupElement).not.toHaveAttribute(
      'aria-activedescendant',
      indexToId(0),
    )
    userEvent.click(radioB)
    expect(radioA).not.toBeChecked()
    expect(radioB).toBeChecked()
    expect(groupElement).toHaveAttribute('aria-activedescendant', indexToId(1))
    userEvent.click(radioA)
    expect(radioA).toBeChecked()
    expect(radioB).not.toBeChecked()
    expect(groupElement).toHaveAttribute('aria-activedescendant', indexToId(0))
  })

  test('should be controlled', () => {
    const { rerender } = renderWithProviders(
      <RadioGroup>
        <RadioButton />
        <RadioButton />
      </RadioGroup>,
    )

    const groupElement = screen.getByRole('radiogroup')
    const [radioA, radioB] = screen.getAllByRole('radio')

    expect(radioA).not.toBeChecked()
    expect(radioB).not.toBeChecked()
    expect(groupElement).not.toHaveAttribute(
      'aria-activedescendant',
      indexToId(0),
    )

    rerender(
      <RadioGroup indexValue={0}>
        <RadioButton />
        <RadioButton />
      </RadioGroup>,
    )

    expect(radioA).toBeChecked()
    expect(radioB).not.toBeChecked()
    expect(groupElement).toHaveAttribute('aria-activedescendant', indexToId(0))
    userEvent.click(radioB)
    expect(radioA).toBeChecked()
    expect(radioB).not.toBeChecked()
    expect(groupElement).toHaveAttribute('aria-activedescendant', indexToId(0))
    userEvent.click(radioA)
    expect(radioA).toBeChecked()
    expect(radioB).not.toBeChecked()
    expect(groupElement).toHaveAttribute('aria-activedescendant', indexToId(0))

    rerender(
      <RadioGroup indexValue={1}>
        <RadioButton />
        <RadioButton />
      </RadioGroup>,
    )

    expect(radioA).not.toBeChecked()
    expect(radioB).toBeChecked()
    expect(groupElement).toHaveAttribute('aria-activedescendant', indexToId(1))
    userEvent.click(radioB)
    expect(radioA).not.toBeChecked()
    expect(radioB).toBeChecked()
    expect(groupElement).toHaveAttribute('aria-activedescendant', indexToId(1))
    userEvent.click(radioA)
    expect(radioA).not.toBeChecked()
    expect(radioB).toBeChecked()
    expect(groupElement).toHaveAttribute('aria-activedescendant', indexToId(1))
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
