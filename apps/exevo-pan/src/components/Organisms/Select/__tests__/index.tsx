import { useState } from 'react'
import { screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithProviders, setup, assertNoA11yViolations } from 'utils/test'
import Select from '..'
import { SelectProps } from '../types'
import { mockedOptionList } from './mock'

const props: SelectProps = {
  label: 'Server',
  placeholder: 'Select your server',
  options: mockedOptionList,
}

setup.scrollIntoView()

describe('<Select />', () => {
  beforeEach(() => {
    jest.useFakeTimers()
  })

  const setupTest = (args?: Partial<SelectProps>) => {
    const mergedArgs = { ...props, ...args } as SelectProps

    renderWithProviders(<Select {...mergedArgs} />)

    const combobox = screen.getByRole('combobox', { name: props.label })

    const assertOpen = (open = true) => {
      expect(combobox).toHaveAttribute('aria-expanded', open ? 'true' : 'false')
      if (open) {
        expect(screen.getByRole('listbox')).toBeVisible()
      } else {
        expect(screen.queryByRole('listbox')).not.toBeInTheDocument()
      }
    }

    const assertValue = (name = mergedArgs.placeholder ?? '') =>
      expect(combobox).toHaveTextContent(name)

    return {
      combobox,
      open: () => {
        assertOpen(false)
        userEvent.click(combobox)
        assertOpen(true)
      },
      assertOpen,
      assertOptions: (selectedValue?: string) => {
        mockedOptionList.forEach(({ name, value }) => {
          const option = screen.getByRole('option', { name })
          expect(option).toHaveAttribute('data-value', value)

          const isSelected = value === selectedValue
          expect(option).toHaveAttribute(
            'aria-selected',
            isSelected ? 'true' : 'false',
          )

          if (isSelected) {
            assertValue(name)
          }
        })
      },
      assertValue,
    }
  }

  test('should render everything correctly (including placeholder)', () => {
    const { assertValue, open, assertOptions } = setupTest()

    assertValue()
    open()
    assertOptions()
  })

  describe('listbox state should be managed correctly', () => {
    test('with pointer', () => {
      const { combobox, assertOpen } = setupTest()

      const openAndAssert = () => {
        userEvent.click(combobox)
        assertOpen()
      }

      assertOpen(false)
      openAndAssert()
      userEvent.click(combobox)
      assertOpen(false)
      openAndAssert()

      userEvent.click(screen.getByRole('button'))
      assertOpen(false)
      openAndAssert()

      const [firstOption] = screen.getAllByRole('option')
      userEvent.click(firstOption)
      assertOpen(false)
      openAndAssert()
      expect(combobox).toHaveFocus()
    })

    test('with keyboard', () => {
      const { combobox, assertOpen } = setupTest()

      assertOpen(false)
      userEvent.tab()
      userEvent.keyboard('{enter}')
      expect(combobox).toHaveFocus()
      assertOpen()

      userEvent.keyboard('{enter}')
      assertOpen(false)

      userEvent.keyboard('{arrowdown}')
      assertOpen()
      userEvent.keyboard('{arrowdown}')
      assertOpen()

      userEvent.keyboard('{escape}')
      assertOpen(false)

      userEvent.keyboard('{backspace}')
      userEvent.keyboard('{space}')
      assertOpen()
    })
  })

  describe('should manage its value state correctly', () => {
    test('uncontrolled', () => {
      const onChange = jest.fn()
      const initialOptionIndex = 5
      const { assertValue, open } = setupTest({
        defaultValue: mockedOptionList[initialOptionIndex].value,
        onChange,
      })

      const assertSelectedOption = (optionIndex: number) => {
        const option = mockedOptionList[optionIndex]
        assertValue(option.name)
      }

      let changeCalls = 0
      let lastSelectedIndex = -1
      const clickAndAssert = (optionIndex: number) => {
        userEvent.click(screen.getAllByRole('option')[optionIndex])
        if (lastSelectedIndex !== optionIndex) {
          changeCalls += 1
        }
        lastSelectedIndex = optionIndex
        expect(onChange).toHaveBeenCalledTimes(changeCalls)

        assertSelectedOption(optionIndex)
      }

      assertSelectedOption(initialOptionIndex)

      open()
      clickAndAssert(1)

      open()
      clickAndAssert(2)
      open()
      clickAndAssert(2)

      open()
      userEvent.keyboard('{arrowup}')
      changeCalls += 1
      assertSelectedOption(1)
      userEvent.keyboard('{arrowdown}')
      changeCalls += 1
      assertSelectedOption(2)
      userEvent.keyboard('{arrowdown}')
      changeCalls += 1
      assertSelectedOption(3)

      clickAndAssert(0)
    })

    test('controlled', () => {
      const initialOptionIndex = 5
      const initialOption = mockedOptionList[initialOptionIndex]
      const ControlledComponent = () => {
        const [value, setValue] = useState(initialOption.value)

        return (
          <Select
            {...props}
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        )
      }

      renderWithProviders(<ControlledComponent />)

      const combobox = screen.getByRole('combobox', { name: props.label })
      const assertSelectedOption = (optionIndex: number) => {
        const option = mockedOptionList[optionIndex]
        expect(combobox).toHaveTextContent(option.name)
      }

      const clickAndAssert = (optionIndex: number) => {
        userEvent.click(screen.getAllByRole('option')[optionIndex])
        assertSelectedOption(optionIndex)
      }

      assertSelectedOption(initialOptionIndex)
      userEvent.click(combobox)
      clickAndAssert(1)
      userEvent.click(combobox)
      clickAndAssert(2)

      userEvent.click(combobox)
      userEvent.keyboard('{arrowup}')
      assertSelectedOption(1)
      userEvent.keyboard('{arrowdown}')
      assertSelectedOption(2)
      userEvent.keyboard('{arrowdown}')

      clickAndAssert(0)
    })

    test('with forced value', () => {
      let forcedOption = { ...mockedOptionList[5] }
      const { rerender } = renderWithProviders(
        <Select {...props} value={forcedOption.value} />,
      )

      const combobox = screen.getByRole('combobox', { name: props.label })

      const assertForcedOption = () => {
        expect(combobox).toHaveTextContent(forcedOption.name)
      }

      assertForcedOption()
      userEvent.click(combobox)
      userEvent.click(
        screen.getByRole('option', { name: mockedOptionList[2].name }),
      )
      assertForcedOption()
      userEvent.click(combobox)
      userEvent.keyboard('{arrowdown}')
      assertForcedOption()

      forcedOption = { ...mockedOptionList[1] }

      rerender(<Select {...props} value={forcedOption.value} />)

      assertForcedOption()
      userEvent.click(
        screen.getByRole('option', { name: mockedOptionList[2].name }),
      )
      assertForcedOption()
      userEvent.click(combobox)
      userEvent.keyboard('{arrowup}')
      assertForcedOption()
    })
  })

  test('typing on element should search for an option', () => {
    const onChange = jest.fn()
    const { assertValue, open, assertOptions, combobox } = setupTest({
      onChange,
    })

    const fireKey = (key: string) =>
      fireEvent.keyPress(combobox, { key, charCode: key.charCodeAt(0) })

    let onChangeCalls = 0
    const assertOnChangeCall = () => {
      onChangeCalls += 1
      expect(onChange).toHaveBeenCalledTimes(onChangeCalls)
    }

    assertValue()
    open()

    fireKey('a')
    assertOptions('adra')
    assertOnChangeCall()
    fireKey('s')
    assertOptions('assombra')
    assertOnChangeCall()
    fireKey('t')
    assertOptions('astera')
    assertOnChangeCall()
    fireKey('z')
    assertOptions('astera')

    jest.runAllTimers()
    fireKey('b')
    assertOnChangeCall()
    assertOptions('belluma')
    fireKey('be')
    assertOptions('belluma')

    jest.runAllTimers()

    fireKey('o')
    assertOptions('belluma')
  })

  test('both error border and alert state should be managed correctly', () => {
    const { rerender } = renderWithProviders(<Select {...props} />)

    const combobox = screen.getByRole('combobox')
    expect(combobox).not.toHaveClass('border-red')
    expect(screen.queryByRole('alert')).not.toBeInTheDocument()

    rerender(<Select {...props} error="Invalid server" />)
    expect(screen.getByRole('alert')).toHaveTextContent('Invalid server')
    expect(combobox).toHaveClass('border-red')

    rerender(<Select {...props} />)
    expect(combobox).not.toHaveClass('border-red')
    expect(screen.queryByRole('alert')).not.toBeInTheDocument()

    rerender(<Select {...props} error />)
    expect(combobox).toHaveClass('border-red')
    expect(screen.queryByRole('alert')).toBeInTheDocument()

    rerender(<Select {...props} error="" />)
    expect(combobox).not.toHaveClass('border-red')
    expect(screen.queryByRole('alert')).not.toBeInTheDocument()
  })

  test('should be disabled', () => {
    const onChange = jest.fn()
    const { assertOpen, combobox } = setupTest({
      disabled: true,
      onChange,
    })

    userEvent.tab()
    expect(combobox).not.toHaveFocus()

    assertOpen(false)
    userEvent.click(combobox)
    assertOpen(false)

    fireEvent.keyPress(combobox, { key: 'Enter', charCode: 13 })
    assertOpen(false)
    fireEvent.keyPress(combobox, { key: 'ArrowDown', charCode: 40 })
    assertOpen(false)
    fireEvent.keyPress(combobox, { key: 'ArrowDown', charCode: 40 })
    assertOpen(false)
    fireEvent.keyPress(combobox, { key: 'a', charCode: 'a'.charCodeAt(0) })
    assertOpen(false)

    expect(onChange).toHaveBeenCalledTimes(0)
  })

  test('a11y', async () => {
    jest.useRealTimers()
    const { container } = renderWithProviders(<Select {...props} />)
    await assertNoA11yViolations(container)
  })

  test('a11y with accessible label', async () => {
    jest.useRealTimers()
    const { container } = renderWithProviders(
      <Select
        {...props}
        label={<p>element label</p>}
        aria-label="Accessible label"
      />,
    )
    await assertNoA11yViolations(container)
  })
})
