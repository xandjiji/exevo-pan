import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Option } from 'components/Atoms'
import { renderWithProviders } from 'utils/test'
import Listbox from '..'

const mockedOnSelectOption = jest.fn()

describe('<Listbox />', () => {
  test('should render with no highlighted <Option />', () => {
    renderWithProviders(
      <Listbox>
        <Option>option A</Option>
        <Option>option B</Option>
        <Option>option C</Option>
      </Listbox>,
    )

    expect(screen.getByRole('listbox')).not.toHaveAttribute(
      'aria-activedescendant',
    )

    const optionElements = screen.queryAllByRole('option')

    optionElements.forEach((option, index) => {
      /* expect(option).toHaveStyle('background-color: #FFFFFF') */
      expect(option).toMatchSnapshot()
      expect(option).not.toHaveAttribute('aria-selected', 'true')
      expect(option).toHaveAttribute('id', `listbox-item-${index}`)
    })
  })

  test('should render with a highlighted <Option />', () => {
    const { rerender } = renderWithProviders(
      <Listbox highlightedIndex={1}>
        <Option>option A</Option>
        <Option>option B</Option>
        <Option>option C</Option>
      </Listbox>,
    )

    expect(screen.getByRole('listbox')).toHaveAttribute(
      'aria-activedescendant',
      'listbox-item-1',
    )

    const [optionA, optionB, optionC] = screen.queryAllByRole('option')
    /* expect(optionA).toHaveStyle('background-color: #FFFFFF')
    expect(optionB).toHaveStyle('background-color: #C5CAE9')
    expect(optionC).toHaveStyle('background-color: #FFFFFF') */
    expect(optionA).toMatchInlineSnapshot(`
      <option
        aria-selected="false"
        class="styles__Option-sc-am72ib-0 fZyPDg"
        id="listbox-item-0"
        role="option"
        value="option A"
      >
        option A
      </option>
    `)
    expect(optionB).toMatchInlineSnapshot(`
      <option
        aria-selected="false"
        class="styles__Option-sc-am72ib-0 eNIDEs"
        id="listbox-item-1"
        role="option"
        value="option B"
      >
        option B
      </option>
    `)
    expect(optionC).toMatchInlineSnapshot(`
      <option
        aria-selected="false"
        class="styles__Option-sc-am72ib-0 fZyPDg"
        id="listbox-item-2"
        role="option"
        value="option C"
      >
        option C
      </option>
    `)

    rerender(
      <Listbox highlightedIndex={2}>
        <Option>option A</Option>
        <Option>option B</Option>
        <Option>option C</Option>
      </Listbox>,
    )

    /* expect(optionA).toHaveStyle('background-color: #FFFFFF')
    expect(optionB).toHaveStyle('background-color: #FFFFFF')
    expect(optionC).toHaveStyle('background-color: #C5CAE9') */
    expect(optionA).toMatchInlineSnapshot(`
      <option
        aria-selected="false"
        class="styles__Option-sc-am72ib-0 fZyPDg"
        id="listbox-item-0"
        role="option"
        value="option A"
      >
        option A
      </option>
    `)
    expect(optionB).toMatchInlineSnapshot(`
      <option
        aria-selected="false"
        class="styles__Option-sc-am72ib-0 fZyPDg"
        id="listbox-item-1"
        role="option"
        value="option B"
      >
        option B
      </option>
    `)
    expect(optionC).toMatchInlineSnapshot(`
      <option
        aria-selected="false"
        class="styles__Option-sc-am72ib-0 eNIDEs"
        id="listbox-item-2"
        role="option"
        value="option C"
      >
        option C
      </option>
    `)
  })

  test('should render with a few selected', () => {
    const { rerender } = renderWithProviders(
      <Listbox selectedIndex={new Set([0, 2])}>
        <Option>option A</Option>
        <Option>option B</Option>
        <Option>option C</Option>
      </Listbox>,
    )

    const [optionA, optionB, optionC] = screen.queryAllByRole('option')
    expect(optionA).toHaveAttribute('aria-selected', 'true')
    expect(optionB).toHaveAttribute('aria-selected', 'false')
    expect(optionC).toHaveAttribute('aria-selected', 'true')

    rerender(
      <Listbox selectedIndex={new Set([1])}>
        <Option>option A</Option>
        <Option>option B</Option>
        <Option>option C</Option>
      </Listbox>,
    )

    expect(optionA).toHaveAttribute('aria-selected', 'false')
    expect(optionB).toHaveAttribute('aria-selected', 'true')
    expect(optionC).toHaveAttribute('aria-selected', 'false')
  })

  test('clicking an <Option /> should trigger the implicitly passed onClick prop', () => {
    renderWithProviders(
      <Listbox onSelectOption={mockedOnSelectOption}>
        <Option>option A</Option>
        <Option>option B</Option>
        <Option>option C</Option>
      </Listbox>,
    )

    const [optionA, optionB, optionC] = screen.queryAllByRole('option')
    userEvent.click(optionA)
    expect(mockedOnSelectOption).toHaveBeenLastCalledWith({
      name: 'option A',
      value: 'option A',
    })

    userEvent.click(optionB)
    expect(mockedOnSelectOption).toHaveBeenLastCalledWith({
      name: 'option B',
      value: 'option B',
    })

    userEvent.click(optionC)
    expect(mockedOnSelectOption).toHaveBeenLastCalledWith({
      name: 'option C',
      value: 'option C',
    })
  })

  test('should not break with native children', () => {
    renderWithProviders(
      <Listbox onSelectOption={mockedOnSelectOption}>
        <option>option A</option>
        <option>option B</option>
        <option>option C</option>
      </Listbox>,
    )

    expect(screen.getByRole('listbox')).toBeInTheDocument()
    screen.queryAllByRole('option').forEach((option) => {
      expect(option).toBeInTheDocument()
    })
  })
})
