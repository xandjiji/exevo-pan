import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { RadioButton } from 'components/Atoms'
import RadioGroup from '..'

describe('<RadioGroup />', () => {
  describe('renders children correctly', () => {
    test('RadioButtons as children', () => {
      render(
        <RadioGroup>
          <RadioButton />
          <RadioButton />
        </RadioGroup>,
      )

      expect(screen.queryAllByRole('radio')).toHaveLength(2)
    })

    test('html elements as children', () => {
      render(
        <RadioGroup>
          <div role="none" />
          <div role="none" />
        </RadioGroup>,
      )

      expect(screen.queryAllByRole('none')).toHaveLength(2)
    })

    test('html elements AND RadioButtons as children', () => {
      render(
        <RadioGroup>
          <RadioButton data-testid="child" />
          <div data-testid="child" />
        </RadioGroup>,
      )

      expect(screen.queryAllByTestId('child')).toHaveLength(2)
    })
  })
})
