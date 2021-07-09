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

const mockedOnItemSelect = jest.fn()
const mockedScrollIntoView = jest.fn()
window.HTMLElement.prototype.scrollIntoView = mockedScrollIntoView

describe('<AutocompleteInput />', () => {
  beforeEach(() => {
    mockedOnItemSelect.mockReset()
    mockedScrollIntoView.mockReset()
  })

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

  test('with a KEYBOARD, onItemSelect should be called with an <Option /> object', async () => {
    renderWithProviders(
      <AutocompleteInput
        itemList={mockedItemList}
        onItemSelect={mockedOnItemSelect}
      />,
    )

    const inputElement = screen.getByRole('combobox')
    userEvent.type(inputElement, 'pacera{enter}')
    expect(mockedOnItemSelect).toBeCalledTimes(1)
    expect(mockedOnItemSelect).toBeCalledWith({
      name: 'Pacera',
      value: 'Pacera',
    })
    expect(inputElement).toHaveValue('')

    userEvent.type(inputElement, 'pace{enter}')
    expect(mockedOnItemSelect).toBeCalledTimes(1)
    expect(inputElement).toHaveValue('pace')
    userEvent.type(inputElement, 'mbra{enter}')
    expect(mockedOnItemSelect).toBeCalledTimes(2)
    expect(mockedOnItemSelect).toBeCalledWith({
      name: 'Pacembra',
      value: 'Pacembra',
    })
    expect(inputElement).toHaveValue('')

    userEvent.type(inputElement, 'pace')
    expect(inputElement).toHaveValue('pace')
    userEvent.keyboard('{arrowdown}')
    expect(mockedScrollIntoView).toBeCalledTimes(1)
    expect(inputElement).toHaveValue('Pacera')
    userEvent.keyboard('{enter}')
    expect(mockedOnItemSelect).toBeCalledTimes(3)
    expect(mockedOnItemSelect).toBeCalledWith({
      name: 'Pacembra',
      value: 'Pacembra',
    })
    expect(inputElement).toHaveValue('')

    await waitFor(() => {})
  })

  test('with a MOUSE, onItemSelect should be called with an <Option /> object', async () => {
    renderWithProviders(
      <AutocompleteInput
        itemList={mockedItemList}
        onItemSelect={mockedOnItemSelect}
      />,
    )

    const inputElement = screen.getByRole('combobox')
    userEvent.click(inputElement)
    const [adraOption] = screen.getAllByRole('option')
    userEvent.click(adraOption)
    expect(mockedOnItemSelect).toBeCalledTimes(1)
    expect(mockedOnItemSelect).toBeCalledWith({
      name: 'Adra',
      value: 'Adra',
    })

    userEvent.type(inputElement, 'pace')
    expect(inputElement).toHaveValue('pace')
    const [pacembraOption] = screen.getAllByRole('option')
    userEvent.click(pacembraOption)
    expect(mockedOnItemSelect).toBeCalledTimes(2)
    expect(mockedOnItemSelect).toBeCalledWith({
      name: 'Pacembra',
      value: 'Pacembra',
    })
    expect(inputElement).toHaveValue('')

    await waitFor(() => {})
  })

  test.todo('itemList should be updated on re-render')

  test.todo(
    'keyboard navigation should highlight <Option />, circular, scroll <Listbox />',
  )

  test.todo('keyboard navigation should set input value')

  test.todo('<Listbox /> visibility should be controlled correctly')

  test.todo('typing should filter elements in <Listbox />')

  test.todo('full journey')
})
