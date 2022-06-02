import { screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithProviders, assertNoA11yViolations } from 'utils/test'
import { KeyboardModifiers, ArrowControls, AssertKeyboardProps } from './types'
import Slider from '..'

describe('<Slider />', () => {
  const setupArrowControls = (): ArrowControls => {
    userEvent.tab()
    const railElement = document.activeElement as Element

    return {
      inc: (modifiers?: KeyboardModifiers): void => {
        fireEvent.keyDown(railElement, {
          key: 'ArrowUp',
          ...modifiers,
        })
      },
      dec: (modifiers?: KeyboardModifiers): void => {
        fireEvent.keyDown(railElement, {
          key: 'ArrowDown',
          ...modifiers,
        })
      },
    }
  }

  const assertKeyboardControls = ({
    min,
    max,
    step,
  }: AssertKeyboardProps): void => {
    const inputElement = screen.getByLabelText('label')

    const { inc, dec } = setupArrowControls()
    const TRIES_OVER_SLIDER_RANGE = 5

    for (let i = min; i < max + TRIES_OVER_SLIDER_RANGE; i += step) {
      if (i > max) {
        expect(inputElement).toHaveValue(max.toString())
      } else {
        expect(inputElement).toHaveValue(i.toString())
      }
      inc()
    }

    for (let i = max; i > min - TRIES_OVER_SLIDER_RANGE; i -= step) {
      if (i < min) {
        expect(inputElement).toHaveValue(min.toString())
      } else {
        expect(inputElement).toHaveValue(i.toString())
      }
      dec()
    }
  }

  describe('when interacting with a keyboard', () => {
    test('should respect ranges with default step', () => {
      const min = -20
      const max = 20
      renderWithProviders(
        <Slider label="label" id="input-id" min={min} max={max} />,
      )

      assertKeyboardControls({ min, max, step: 1 })
    })

    test('should respect ranges with float step', () => {
      const min = -20
      const max = 20
      const step = 0.5
      renderWithProviders(
        <Slider label="label" id="input-id" min={min} max={max} step={step} />,
      )

      assertKeyboardControls({ min, max, step })
    })

    test('should respect ranges with CTRL and SHIFT modifiers', () => {
      const min = -1000
      const max = 1000
      renderWithProviders(
        <Slider label="label" id="input-id" min={min} max={max} />,
      )

      const inputElement = screen.getByLabelText('label')

      let currentValue = min
      const assertCurrentValue = (): void => {
        expect(inputElement).toHaveValue(currentValue.toString())
      }

      const { inc, dec } = setupArrowControls()
      const CTRL_MODIFIER = 10
      const SHIFT_MODIFIER = 100

      inc({ ctrlKey: true })
      currentValue += CTRL_MODIFIER
      assertCurrentValue()

      inc({ shiftKey: true })
      currentValue += SHIFT_MODIFIER
      assertCurrentValue()

      inc({ ctrlKey: true })
      currentValue += CTRL_MODIFIER
      assertCurrentValue()

      inc({ shiftKey: true })
      currentValue += SHIFT_MODIFIER
      assertCurrentValue()

      inc({ ctrlKey: true, shiftKey: true })
      currentValue += CTRL_MODIFIER * SHIFT_MODIFIER
      assertCurrentValue()

      /* should be capped by max value */
      inc({ ctrlKey: true, shiftKey: true })
      inc({ ctrlKey: true, shiftKey: true })
      inc({ ctrlKey: true, shiftKey: true })
      currentValue = max
      assertCurrentValue()

      dec({ ctrlKey: true })
      currentValue -= CTRL_MODIFIER
      assertCurrentValue()

      dec({ shiftKey: true })
      currentValue -= SHIFT_MODIFIER
      assertCurrentValue()

      dec({ ctrlKey: true })
      currentValue -= CTRL_MODIFIER
      assertCurrentValue()

      dec({ shiftKey: true })
      currentValue -= SHIFT_MODIFIER
      assertCurrentValue()

      dec({ ctrlKey: true, shiftKey: true })
      currentValue -= CTRL_MODIFIER * SHIFT_MODIFIER
      assertCurrentValue()

      /* should be capped by min value */
      dec({ ctrlKey: true, shiftKey: true })
      dec({ ctrlKey: true, shiftKey: true })
      dec({ ctrlKey: true, shiftKey: true })
      currentValue = min
      assertCurrentValue()
    })

    test('the disabled slider should NOT respond', () => {
      const min = -20
      const max = 20
      renderWithProviders(
        <Slider label="label" id="input-id" min={min} max={max} disabled />,
      )
      const inputElement = screen.getByLabelText('label')

      const { inc, dec } = setupArrowControls()

      const currentValue = min.toString()
      expect(inputElement).toHaveValue(currentValue)
      inc()
      expect(inputElement).toHaveValue(currentValue)
      inc()
      expect(inputElement).toHaveValue(currentValue)
      dec()
      expect(inputElement).toHaveValue(currentValue)
      dec()
      expect(inputElement).toHaveValue(currentValue)
    })
  })

  describe('marks should be rendered and interacted correctly', () => {
    test('when automatically defined', () => {
      renderWithProviders(
        <Slider label="label" min={-2} max={2} marks step={0.5} value={0.1} />,
      )

      const sliderElement = screen.getByRole('slider')

      ;[-2, -1.5, -1, -0.5, 0, 0.5, 1, 1.5, 2].forEach((mark) => {
        const stringValue = mark.toString()
        userEvent.click(screen.getByText(stringValue))
        expect(sliderElement).toHaveAttribute('aria-valuenow', stringValue)
      })
    })

    test('when custom defined', () => {
      const customMarks = [
        { label: 'cold', value: -2 },
        { label: '0', value: 0 },
        { label: 'R$ 2,00', value: 2 },
      ]

      renderWithProviders(
        <Slider
          label="label"
          min={-2}
          max={2}
          marks={customMarks}
          step={0.5}
          value={0.1}
        />,
      )

      const sliderElement = screen.getByRole('slider')

      customMarks.forEach(({ label, value }) => {
        userEvent.click(screen.getByText(label))
        expect(sliderElement).toHaveAttribute('aria-valuenow', value.toString())
      })
    })
  })

  describe('if input is shown', () => {
    test('it should control the slider', () => {
      renderWithProviders(
        <Slider label="label" min={-2} max={2} step={0.5} showInput />,
      )

      const sliderElement = screen.getByRole('slider')
      const inputElement = screen.getByRole('spinbutton')

      userEvent.clear(inputElement)
      userEvent.type(inputElement, '1')
      expect(inputElement).toHaveValue(1)
      expect(sliderElement).toHaveAttribute('aria-valuenow', '1')

      userEvent.type(inputElement, '.5')
      expect(inputElement).toHaveValue(1.5)
      expect(sliderElement).toHaveAttribute('aria-valuenow', '1.5')

      userEvent.clear(inputElement)
      userEvent.type(inputElement, '-2')
      expect(inputElement).toHaveValue(-2)
      expect(sliderElement).toHaveAttribute('aria-valuenow', '-2')
    })

    test('it should NOT control the slider if there are invalid values', () => {
      renderWithProviders(
        <Slider label="label" min={-2} max={2} step={0.5} showInput />,
      )

      const sliderElement = screen.getByRole('slider')
      const inputElement = screen.getByRole('spinbutton')

      userEvent.clear(inputElement)
      userEvent.type(inputElement, '1')
      expect(inputElement).toHaveValue(1)
      expect(sliderElement).toHaveAttribute('aria-valuenow', '1')

      userEvent.type(inputElement, '0')
      expect(inputElement).toHaveValue(10)
      expect(sliderElement).toHaveAttribute('aria-valuenow', '1')

      userEvent.clear(inputElement)
      expect(sliderElement).toHaveAttribute('aria-valuenow', '1')

      userEvent.type(inputElement, '-')
      expect(inputElement).toHaveValue(null)
      expect(sliderElement).toHaveAttribute('aria-valuenow', '1')

      userEvent.type(inputElement, '-0')
      expect(inputElement).toHaveValue(0)
      expect(sliderElement).toHaveAttribute('aria-valuenow', '0')

      userEvent.type(inputElement, '.5')
      expect(inputElement).toHaveValue(-0.5)
      expect(sliderElement).toHaveAttribute('aria-valuenow', '-0.5')
    })

    test('it should be controlled by the slider', () => {
      const min = -20
      const max = -20
      const step = 0.5
      renderWithProviders(
        <Slider
          label="label"
          id="input-id"
          min={min}
          max={max}
          step={step}
          showInput
        />,
      )

      const [inputElement, spinButton] = screen.getAllByLabelText('label')

      const { inc } = setupArrowControls()

      for (let i = min; i < max; i += step) {
        expect(spinButton).toHaveValue(i)
        expect(inputElement).toHaveValue(i.toString())
        inc()
      }

      for (let i = max; i > min; i -= step) {
        expect(spinButton).toHaveValue(i)
        expect(inputElement).toHaveValue(i.toString())
        inc()
      }
    })
  })

  describe('its value should be able to be controlled', () => {
    test('by props', () => {
      const mockedOnChange = jest.fn()
      const props = {
        label: 'label',
        id: 'input-id',
        min: -20,
        max: 20,
        step: 0.5,
        showInput: true,
        onChange: mockedOnChange,
      }

      let value = 1
      const { rerender } = renderWithProviders(
        <Slider {...props} value={value} />,
      )
      let [inputElement] = screen.getAllByLabelText('label')
      expect(inputElement).toHaveValue('1')
      expect(mockedOnChange).toHaveBeenCalledTimes(0)

      value = -5
      rerender(<Slider {...props} value={value} />)
      ;[inputElement] = screen.getAllByLabelText('label')
      expect(inputElement).toHaveValue('-5')
      expect(mockedOnChange).toHaveBeenCalledTimes(1)
    })
  })

  test('should transform displayed texts correctly', () => {
    const transformToBrl = (newValue: number): string =>
      `R$ ${newValue.toFixed(2).replace('.', ',')}`

    const currentValue = -10.57
    renderWithProviders(
      <Slider
        label="label"
        min={-20}
        max={20}
        step={0.5}
        value={currentValue}
        transformDisplayedValues={transformToBrl}
      />,
    )

    expect(screen.getByText(transformToBrl(currentValue))).toBeInTheDocument()
  })

  test('should be disabled', () => {
    renderWithProviders(
      <Slider
        label="label"
        id="input-id"
        min={-2}
        max={2}
        step={0.5}
        showInput
        disabled
      />,
    )

    const [spinButton, inputElement] = screen.getAllByLabelText('label')
    expect(spinButton).toBeDisabled()
    expect(inputElement).toBeDisabled()
  })

  describe('A11y', () => {
    test('should not have violations', async () => {
      const { container } = renderWithProviders(
        <Slider label="label" id="input-id" min={-2} max={2} step={0.5} />,
      )

      await assertNoA11yViolations(container)
    })
  })

  test('should spread "data-testid" correctly', () => {
    renderWithProviders(
      <Slider data-testid="test-id" label="label" min={0} max={10} />,
    )

    expect(screen.getByTestId('test-id')).toBeInTheDocument()
  })
})
