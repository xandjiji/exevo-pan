import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Option } from 'components/Atoms'
import { renderWithProviders, setup, assertNoA11yViolations } from 'utils/test'
import Listbox from '..'

const mockedOnSelectOption = jest.fn()
const mockedScrollIntoView = setup.scrollIntoView()

describe('<Listbox />', () => {
  beforeEach(() => {
    mockedScrollIntoView.mockReset()
  })

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
    expect(mockedScrollIntoView).toBeCalledTimes(1)

    const [optionA, optionB, optionC] = screen.queryAllByRole('option')
    /* expect(optionA).toHaveStyle('background-color: #FFFFFF')
    expect(optionB).toHaveStyle('background-color: #C5CAE9')
    expect(optionC).toHaveStyle('background-color: #FFFFFF') */
    expect(optionA).toMatchInlineSnapshot(`
      <div
        aria-selected="false"
        class="text-tsm text-onSurface hover:bg-primaryVariant w-full cursor-pointer py-2 px-3 font-light transition-colors bg-surface"
        data-value="option A"
        id="listbox-item-0"
        role="option"
      >
        option A
      </div>
    `)
    expect(optionB).toMatchInlineSnapshot(`
      <div
        aria-selected="false"
        class="text-tsm text-onSurface hover:bg-primaryVariant w-full cursor-pointer py-2 px-3 font-light transition-colors bg-primaryVariant"
        data-value="option B"
        id="listbox-item-1"
        role="option"
      >
        option B
      </div>
    `)
    expect(optionC).toMatchInlineSnapshot(`
      <div
        aria-selected="false"
        class="text-tsm text-onSurface hover:bg-primaryVariant w-full cursor-pointer py-2 px-3 font-light transition-colors bg-surface"
        data-value="option C"
        id="listbox-item-2"
        role="option"
      >
        option C
      </div>
    `)

    rerender(
      <Listbox highlightedIndex={2}>
        <Option>option A</Option>
        <Option>option B</Option>
        <Option>option C</Option>
      </Listbox>,
    )
    expect(mockedScrollIntoView).toBeCalledTimes(2)

    /* expect(optionA).toHaveStyle('background-color: #FFFFFF')
    expect(optionB).toHaveStyle('background-color: #FFFFFF')
    expect(optionC).toHaveStyle('background-color: #C5CAE9') */
    expect(optionA).toMatchInlineSnapshot(`
      <div
        aria-selected="false"
        class="text-tsm text-onSurface hover:bg-primaryVariant w-full cursor-pointer py-2 px-3 font-light transition-colors bg-surface"
        data-value="option A"
        id="listbox-item-0"
        role="option"
      >
        option A
      </div>
    `)
    expect(optionB).toMatchInlineSnapshot(`
      <div
        aria-selected="false"
        class="text-tsm text-onSurface hover:bg-primaryVariant w-full cursor-pointer py-2 px-3 font-light transition-colors bg-surface"
        data-value="option B"
        id="listbox-item-1"
        role="option"
      >
        option B
      </div>
    `)
    expect(optionC).toMatchInlineSnapshot(`
      <div
        aria-selected="false"
        class="text-tsm text-onSurface hover:bg-primaryVariant w-full cursor-pointer py-2 px-3 font-light transition-colors bg-primaryVariant"
        data-value="option C"
        id="listbox-item-2"
        role="option"
      >
        option C
      </div>
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

  test('a11y', async () => {
    const { container } = renderWithProviders(
      <Listbox aria-label="label">
        <Option>option A</Option>
        <Option>option B</Option>
        <Option>option C</Option>
      </Listbox>,
    )
    await assertNoA11yViolations(container)
  })
})
