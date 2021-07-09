/* eslint-disable max-lines-per-function */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable testing-library/no-wait-for-empty-callback */

import { screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithProviders } from 'utils/test'
import AutocompleteInput from '..'
import { mockedItemList } from './mock'

/*
    We are using 'await waitFor(() => {})' at the end
    of each test to get rid of unexpected warnings.
    This is a issue with react-popper. See:
    https://github.com/popperjs/react-popper/issues/368
*/

describe('<AutocompleteInput />', () => {
  test('classname, style, props, aria attributes and children should be managed correctly', async () => {
    const { container } = renderWithProviders(
      <AutocompleteInput
        className="autocomplete-input-class"
        style={{ width: 999 }}
        itemList={mockedItemList}
        placeholder="Choose a server"
      />,
    )

    const [wrapperElement] = container.getElementsByClassName(
      'autocomplete-input-class',
    )
    expect(wrapperElement).toHaveStyle('width: 999px')

    const inputElement = screen.getByPlaceholderText('Choose a server')
    expect(inputElement).toHaveAttribute('aria-expanded', 'false')
    userEvent.tab()
    const listboxElement = screen.getByRole('listbox')
    expect(inputElement).toHaveAttribute('aria-haspopup', 'true')
    expect(inputElement).toHaveAttribute('role', 'combobox')
    expect(inputElement).toHaveAttribute('aria-autocomplete', 'list')
    expect(inputElement).toHaveAttribute('aria-expanded', 'true')
    expect(inputElement).toHaveAttribute(
      'aria-owns',
      listboxElement.getAttribute('id'),
    )

    const optionsElement = screen.getAllByRole('option')
    expect(optionsElement).toHaveLength(mockedItemList.length)
    optionsElement.forEach((option, index) => {
      expect(option).toHaveTextContent(mockedItemList[index].name)
      expect(option).toHaveValue(mockedItemList[index].value)
    })

    fireEvent.blur(inputElement)
    expect(inputElement).toHaveAttribute('aria-expanded', 'false')
    expect(listboxElement).not.toBeVisible()
    optionsElement.forEach(option => {
      expect(option).not.toBeVisible()
    })

    await waitFor(() => {})
  })

  test.todo(
    'onItemSelect should be called with an <Option /> object (click and enter)',
  )

  test.todo('itemList should be updated on re-render')

  test.todo(
    'keyboard navigation should highlight <Option />, circular, scroll <Listbox />',
  )

  test.todo('keyboard navigation should set input value')

  test.todo('<Listbox /> visibility should be controlled correctly')

  test.todo('typing should filter elements in <Listbox />')

  test.todo('full journey')
})
