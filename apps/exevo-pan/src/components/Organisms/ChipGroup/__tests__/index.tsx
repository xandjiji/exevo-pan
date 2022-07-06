import { useState } from 'react'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithProviders } from 'utils/test'
import ChipGroup from '..'
import { ChipGroupProps } from '../types'

const args: ChipGroupProps = {
  label: 'Vocation',
  name: 'inputName',
  options: [
    { name: 'Knight', value: 'knight' },
    { name: 'Paladin', value: 'paladin' },
    { name: 'Sorcerer', value: 'sorcerer' },
    { name: 'Druid', value: 'druid' },
  ],
}

const ControlledChipGroup = () => {
  const [value, setValue] = useState(args.options[0].value)
  return (
    <ChipGroup
      {...args}
      value={value}
      onChange={(event) => setValue(event.target.value)}
    />
  )
}

const mockedOnChange = jest.fn()

describe('<ChipGroup />', () => {
  const setup = () => {
    let onChangeCalls = 0
    const radioButtons = screen.getAllByRole('radio')

    const assertActive = (activeIndex?: number) => {
      radioButtons.forEach((radio, childIndex) => {
        if (childIndex === activeIndex) {
          expect(radio).toBeChecked()
        } else {
          expect(radio).not.toBeChecked()
        }
      })
    }

    const clickAndAssertActive = (activeIndex: number) => {
      userEvent.click(radioButtons[activeIndex])
      assertActive(activeIndex)
    }

    const clickAndAssertChangeCalls = (activeIndex: number) => {
      userEvent.click(radioButtons[activeIndex])
      onChangeCalls += 1

      expect(mockedOnChange).toHaveBeenCalledTimes(onChangeCalls)
      expect(mockedOnChange).toHaveBeenLastCalledWith(
        args.options[activeIndex].value,
      )
    }

    return {
      radioButtons,
      assertActive,
      clickAndAssertActive,
      clickAndAssertChangeCalls,
    }
  }

  beforeEach(() => {
    mockedOnChange.mockClear()
  })

  describe('if uncontrolled', () => {
    test('only the selected element should be checked', () => {
      renderWithProviders(<ChipGroup {...args} />)

      const { assertActive, clickAndAssertActive } = setup()
      assertActive()

      clickAndAssertActive(1)
      clickAndAssertActive(0)
      clickAndAssertActive(3)
    })

    test('`onChange` should return the correct value', () => {
      renderWithProviders(
        <ChipGroup
          {...args}
          onChange={(event) => {
            mockedOnChange(event.target.value)
          }}
        />,
      )

      const { clickAndAssertChangeCalls } = setup()

      clickAndAssertChangeCalls(1)
      clickAndAssertChangeCalls(3)
      clickAndAssertChangeCalls(0)
      clickAndAssertChangeCalls(2)
    })

    test('`defaultValue` should be set correctly', () => {
      const defaultValueIndex = 3
      renderWithProviders(
        <ChipGroup
          {...args}
          defaultValue={args.options[defaultValueIndex].value}
        />,
      )

      const { assertActive, clickAndAssertActive } = setup()
      assertActive(defaultValueIndex)

      clickAndAssertActive(1)
      clickAndAssertActive(0)
      clickAndAssertActive(3)
    })
  })

  describe('if controlled', () => {
    test('only the selected element should be checked', () => {
      renderWithProviders(<ControlledChipGroup />)

      const { clickAndAssertActive } = setup()

      clickAndAssertActive(1)
      clickAndAssertActive(0)
      clickAndAssertActive(3)
    })

    test('`onChange` should return the correct value', () => {
      renderWithProviders(
        <ChipGroup
          {...args}
          value={args.options[3].value}
          onChange={(event) => {
            mockedOnChange(event.target.value)
          }}
        />,
      )

      const { clickAndAssertChangeCalls } = setup()

      clickAndAssertChangeCalls(1)
      clickAndAssertChangeCalls(0)
      clickAndAssertChangeCalls(2)
    })
  })
})
