/* eslint-disable max-lines-per-function */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable testing-library/no-wait-for-empty-callback */

import { render, screen, fireEvent, waitFor } from '@testing-library/react'
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
    expect(inputElement).toHaveValue('Pacembra')
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

  test('itemList should be updated on re-render', async () => {
    const { rerender } = renderWithProviders(
      <AutocompleteInput
        itemList={[...mockedItemList, { name: 'Julera', value: 'Julera' }]}
      />,
    )

    const inputElement = screen.getByRole('combobox')
    userEvent.click(inputElement)
    expect(screen.getAllByRole('option')).toHaveLength(104)

    rerender(<AutocompleteInput itemList={mockedItemList} />)
    expect(screen.getAllByRole('option')).toHaveLength(103)

    rerender(
      <AutocompleteInput
        itemList={[
          { name: 'Julera', value: 'Julera' },
          { name: 'Nova', value: 'Nova' },
        ]}
      />,
    )
    expect(screen.getAllByRole('option')).toHaveLength(2)

    await waitFor(() => {})
  })

  test('keyboard arrows should navigate items in circular fashion and highlight items correctly', async () => {
    renderWithProviders(<AutocompleteInput itemList={mockedItemList} />)

    userEvent.tab()
    const optionsElement = screen.getAllByRole('option')
    const firstOption = optionsElement[0]
    const secondOption = optionsElement[1]
    const lastOption = optionsElement[optionsElement.length - 1]

    userEvent.keyboard('{arrowup}')
    expect(mockedScrollIntoView).toBeCalledTimes(1)
    expect(firstOption).toHaveStyle('background-color: #FFFFFF')
    expect(secondOption).toHaveStyle('background-color: #FFFFFF')
    expect(lastOption).toHaveStyle('background-color: #C5CAE9')

    userEvent.keyboard('{arrowdown}')
    expect(mockedScrollIntoView).toBeCalledTimes(2)
    expect(firstOption).toHaveStyle('background-color: #C5CAE9')
    expect(secondOption).toHaveStyle('background-color: #FFFFFF')
    expect(lastOption).toHaveStyle('background-color: #FFFFFF')

    userEvent.keyboard('{arrowdown}')
    expect(mockedScrollIntoView).toBeCalledTimes(3)
    expect(firstOption).toHaveStyle('background-color: #FFFFFF')
    expect(secondOption).toHaveStyle('background-color: #C5CAE9')
    expect(lastOption).toHaveStyle('background-color: #FFFFFF')

    userEvent.keyboard('{arrowup}')
    expect(mockedScrollIntoView).toBeCalledTimes(4)
    expect(firstOption).toHaveStyle('background-color: #C5CAE9')
    expect(secondOption).toHaveStyle('background-color: #FFFFFF')
    expect(lastOption).toHaveStyle('background-color: #FFFFFF')

    userEvent.clear(screen.getByRole('combobox'))
    userEvent.keyboard('{arrowdown}')
    expect(mockedScrollIntoView).toBeCalledTimes(5)
    expect(firstOption).toHaveStyle('background-color: #C5CAE9')
    expect(secondOption).toHaveStyle('background-color: #FFFFFF')
    expect(lastOption).toHaveStyle('background-color: #FFFFFF')

    await waitFor(() => {})
  })

  test('keyboard navigation should set input value', async () => {
    renderWithProviders(<AutocompleteInput itemList={mockedItemList} />)

    const inputElement = screen.getByRole('combobox')
    expect(inputElement).toHaveValue('')

    userEvent.type(inputElement, 'an')
    expect(inputElement).toHaveValue('an')

    userEvent.keyboard('{arrowdown}')
    expect(inputElement).toHaveValue('Antica')

    userEvent.keyboard('{arrowdown}')
    expect(inputElement).toHaveValue('Relania')

    userEvent.keyboard('{arrowdown}')
    expect(inputElement).toHaveValue('Xandebra')

    userEvent.keyboard('{arrowdown}')
    expect(inputElement).toHaveValue('Antica')

    userEvent.keyboard('{arrowup}')
    expect(inputElement).toHaveValue('Xandebra')

    await waitFor(() => {})
  })

  test('<Listbox /> visibility should be controlled correctly by KEYBOARD', async () => {
    renderWithProviders(<AutocompleteInput itemList={mockedItemList} />)

    const inputElement = screen.getByRole('combobox')
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument()

    userEvent.tab()
    const listboxElement = screen.getByRole('listbox')
    expect(listboxElement).toBeVisible()

    userEvent.tab()
    expect(listboxElement).not.toBeVisible()

    userEvent.click(inputElement)
    expect(listboxElement).toBeVisible()

    userEvent.tab()
    expect(listboxElement).not.toBeVisible()

    userEvent.click(inputElement)
    expect(listboxElement).toBeVisible()

    userEvent.type(inputElement, 'a')
    expect(listboxElement).toBeVisible()

    userEvent.tab()
    expect(listboxElement).not.toBeVisible()

    userEvent.keyboard('{enter}')
    expect(listboxElement).toBeVisible()

    userEvent.type(inputElement, 'a')
    expect(listboxElement).toBeVisible()

    userEvent.click(screen.getByLabelText('Clear input'))
    expect(listboxElement).toBeVisible()

    userEvent.type(inputElement, 'a')
    userEvent.keyboard('{enter}')
    expect(listboxElement).toBeVisible()

    userEvent.type(inputElement, 'dra{enter}')
    expect(listboxElement).not.toBeVisible()

    userEvent.type(inputElement, 'a')
    expect(listboxElement).toBeVisible()
    userEvent.keyboard('{arrowdown}')
    expect(listboxElement).toBeVisible()
    userEvent.keyboard('{enter}')
    expect(listboxElement).not.toBeVisible()

    await waitFor(() => {})
  })

  test('<Listbox /> visibility should be controlled correctly by MOUSE', async () => {
    renderWithProviders(<AutocompleteInput itemList={mockedItemList} />)

    const inputElement = screen.getByRole('combobox')
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument()

    userEvent.click(inputElement)
    const listboxElement = screen.getByRole('listbox')
    expect(listboxElement).toBeVisible()

    fireEvent.blur(inputElement)
    expect(listboxElement).not.toBeVisible()

    fireEvent.focus(inputElement)
    expect(listboxElement).toBeVisible()

    userEvent.type(inputElement, 'a')
    expect(listboxElement).toBeVisible()
    userEvent.click(screen.getByLabelText('Clear input'))
    expect(listboxElement).toBeVisible()

    const [firstOption] = screen.getAllByRole('option')
    userEvent.click(firstOption)
    expect(listboxElement).not.toBeVisible()

    userEvent.click(inputElement)
    expect(listboxElement).toBeVisible()

    await waitFor(() => {})
  })

  test.todo('typing should filter elements in <Listbox />')
})
