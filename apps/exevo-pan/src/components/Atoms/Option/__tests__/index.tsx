import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithProviders, assertNoA11yViolations } from 'utils/test'
import Option from '..'

const mockedOnClick = jest.fn()

describe('<Option />', () => {
  beforeEach(() => {
    mockedOnClick.mockReset()
  })

  test('should render with correct name and value', () => {
    renderWithProviders(<Option value="actualValue">children</Option>)

    const optionElement = screen.getByRole('option')
    expect(optionElement).toHaveAttribute('data-value', 'actualValue')
    expect(screen.getByText('children')).toBeInTheDocument()
    /* expect(optionElement).toHaveStyle('background-color: #FFFFFF') */
    expect(optionElement).toMatchSnapshot()
  })

  test('should render with fallback value', () => {
    renderWithProviders(<Option>children</Option>)

    const optionElement = screen.getByRole('option')
    expect(optionElement).toHaveAttribute('data-value', 'children')
    expect(screen.getByText('children')).toBeInTheDocument()
    /* expect(optionElement).toHaveStyle('background-color: #FFFFFF') */
    expect(optionElement).toMatchSnapshot()
  })

  test('should render with highlighted style', () => {
    renderWithProviders(<Option highlighted>children</Option>)

    /* expect(screen.getByRole('option')).toHaveStyle('background-color: #C5CAE9') */
    expect(screen.getByRole('option')).toMatchSnapshot()
  })

  test('should call onClick function with an Option object', () => {
    renderWithProviders(
      <Option value="actualValue" onClick={mockedOnClick}>
        children
      </Option>,
    )

    userEvent.click(screen.getByRole('option'))
    expect(mockedOnClick).toBeCalledTimes(1)
    expect(mockedOnClick).toBeCalledWith({
      name: 'children',
      value: 'actualValue',
    })
  })

  test('should call onClick function with an Option object AND fallback value', () => {
    renderWithProviders(<Option onClick={mockedOnClick}>children</Option>)

    userEvent.click(screen.getByRole('option'))
    expect(mockedOnClick).toBeCalledTimes(1)
    expect(mockedOnClick).toBeCalledWith({
      name: 'children',
      value: 'children',
    })
  })

  test('a11y', async () => {
    const { container } = renderWithProviders(
      <div role="listbox" aria-label="label">
        <Option>children</Option>
      </div>,
    )
    await assertNoA11yViolations(container)
  })
})
