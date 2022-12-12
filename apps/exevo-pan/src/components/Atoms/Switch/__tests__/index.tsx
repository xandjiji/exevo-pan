import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithProviders, assertNoA11yViolations } from 'utils/test'
import Switch from '..'

const mockedOnClick = jest.fn()

describe('<Switch />', () => {
  beforeEach(() => {
    mockedOnClick.mockReset()
  })

  test('should trigger onClick', () => {
    renderWithProviders(<Switch onClick={mockedOnClick} />)
    const switchElement = screen.getByRole('switch')

    expect(switchElement).not.toBeChecked()
    userEvent.click(switchElement)
    expect(switchElement).toBeChecked()
    expect(mockedOnClick).toBeCalledTimes(1)
  })

  test('should trigger on keypress', () => {
    renderWithProviders(<Switch onClick={mockedOnClick} />)
    const switchElement = screen.getByRole('switch')

    userEvent.tab()
    expect(switchElement).toHaveFocus()

    userEvent.keyboard('{enter}')
    expect(mockedOnClick).toBeCalledTimes(1)
    expect(switchElement).toBeChecked()

    userEvent.keyboard('{enter}')
    expect(mockedOnClick).toBeCalledTimes(2)
    expect(switchElement).not.toBeChecked()
  })

  test('should have icon element', () => {
    renderWithProviders(<Switch icon={<div role="none" />} />)
    expect(screen.getByRole('none')).toBeInTheDocument()
  })

  test('should have children', () => {
    renderWithProviders(<Switch>children</Switch>)
    expect(screen.getByText('children')).toBeInTheDocument()
  })

  test('should be controlled correctly', () => {
    const { rerender } = renderWithProviders(<Switch active />)
    const switchElement = screen.getByRole('switch')

    expect(switchElement).toBeChecked()
    userEvent.click(switchElement)
    expect(switchElement).toBeChecked()

    rerender(<Switch active={false} />)
    expect(switchElement).not.toBeChecked()
    userEvent.click(switchElement)
    expect(switchElement).not.toBeChecked()
  })

  test.todo('disabled state')

  test('a11y', async () => {
    const { container } = renderWithProviders(<Switch aria-label="label" />)
    await assertNoA11yViolations(container)
  })
})
