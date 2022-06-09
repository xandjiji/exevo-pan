import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithProviders, setup } from 'utils/test'
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
          expect(option).toHaveValue(value)

          const isSelected = value === selectedValue
          expect(option).toHaveAttribute(
            'aria-selected',
            isSelected ? 'true' : 'false',
          )
        })
      },
    }
  }

  test('should render everything correctly (including placeholder)', () => {
    const { combobox, open, assertOptions } = setupTest()

    expect(combobox).toHaveTextContent(props.placeholder ?? '')
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

      userEvent.keyboard('{space}')
      assertOpen()
    })
  })

  test.todo('controlled/uncontrolled (defaultValue too)')

  test.todo('controlled/uncontrolled keyboard navigation')

  test.todo('search type')

  test.todo('error')

  test.todo('disabled')

  test.todo('a11y (label as jsx too)')
})
