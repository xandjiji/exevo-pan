import { screen, fireEvent, waitFor } from '@testing-library/react'
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

  test.todo('listbox state should be managed correctly')

  test.todo('controlled/uncontrolled (defaultValue too)')

  test.todo('controlled/uncontrolled keyboard navigation')

  test.todo('search type')

  test.todo('error')

  test.todo('disabled')

  test.todo('a11y (label as jsx too)')
})
