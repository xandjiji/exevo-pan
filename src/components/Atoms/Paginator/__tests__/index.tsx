import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithProviders } from 'utils/test'
import Paginator from '..'

const fakeArgs = {
  totalItems: 3664,
  pageSize: 10,
}

const mockedOnChange = jest.fn()

describe('<Paginator />', () => {
  test('should navigate correctly between pages', () => {
    renderWithProviders(<Paginator {...fakeArgs} />)

    const [goFirst, goPrev, goNext, goLast] = screen.getAllByRole('button')

    expect(goFirst).toBeDisabled()
    expect(goPrev).toBeDisabled()
    expect(goNext).toBeEnabled()
    expect(goLast).toBeEnabled()
    expect(screen.getByText('1 - 10 of 3664')).toBeInTheDocument()

    userEvent.click(goNext)
    expect(screen.getByText('11 - 20 of 3664')).toBeInTheDocument()
    expect(goFirst).toBeEnabled()
    expect(goPrev).toBeEnabled()
    expect(goNext).toBeEnabled()
    expect(goLast).toBeEnabled()

    userEvent.click(goNext)
    expect(screen.getByText('21 - 30 of 3664')).toBeInTheDocument()
    expect(goFirst).toBeEnabled()
    expect(goPrev).toBeEnabled()
    expect(goNext).toBeEnabled()
    expect(goLast).toBeEnabled()

    userEvent.click(goNext)
    expect(screen.getByText('31 - 40 of 3664')).toBeInTheDocument()
    expect(goFirst).toBeEnabled()
    expect(goPrev).toBeEnabled()
    expect(goNext).toBeEnabled()
    expect(goLast).toBeEnabled()

    userEvent.click(goPrev)
    expect(screen.getByText('21 - 30 of 3664')).toBeInTheDocument()
    expect(goFirst).toBeEnabled()
    expect(goPrev).toBeEnabled()
    expect(goNext).toBeEnabled()
    expect(goLast).toBeEnabled()

    userEvent.click(goPrev)
    expect(screen.getByText('11 - 20 of 3664')).toBeInTheDocument()
    expect(goFirst).toBeEnabled()
    expect(goPrev).toBeEnabled()
    expect(goNext).toBeEnabled()
    expect(goLast).toBeEnabled()

    userEvent.click(goLast)
    expect(screen.getByText('3661 - 3664 of 3664')).toBeInTheDocument()
    expect(goFirst).toBeEnabled()
    expect(goPrev).toBeEnabled()
    expect(goNext).toBeDisabled()
    expect(goLast).toBeDisabled()

    userEvent.click(goFirst)
    expect(screen.getByText('1 - 10 of 3664')).toBeInTheDocument()
    expect(goFirst).toBeDisabled()
    expect(goPrev).toBeDisabled()
    expect(goNext).toBeEnabled()
    expect(goLast).toBeEnabled()
  })

  test('should navigate correctly with keyboard between pages', () => {
    renderWithProviders(<Paginator {...fakeArgs} />)

    const goFirst = screen.getByLabelText('Go to first page')
    const goPrev = screen.getByLabelText('Go to previous page')
    const goNext = screen.getByLabelText('Go to next page')
    const goLast = screen.getByLabelText('Go to last page')

    userEvent.tab()
    userEvent.keyboard('{arrowright}')
    expect(screen.getByText('11 - 20 of 3664')).toBeInTheDocument()
    expect(goFirst).toBeEnabled()
    expect(goPrev).toBeEnabled()
    expect(goNext).toBeEnabled()
    expect(goLast).toBeEnabled()

    userEvent.keyboard('{arrowup}')
    expect(screen.getByText('21 - 30 of 3664')).toBeInTheDocument()
    expect(goFirst).toBeEnabled()
    expect(goPrev).toBeEnabled()
    expect(goNext).toBeEnabled()
    expect(goLast).toBeEnabled()

    userEvent.keyboard('{arrowright}')
    expect(screen.getByText('31 - 40 of 3664')).toBeInTheDocument()
    expect(goFirst).toBeEnabled()
    expect(goPrev).toBeEnabled()
    expect(goNext).toBeEnabled()
    expect(goLast).toBeEnabled()

    userEvent.keyboard('{arrowleft}')
    expect(screen.getByText('21 - 30 of 3664')).toBeInTheDocument()
    expect(goFirst).toBeEnabled()
    expect(goPrev).toBeEnabled()
    expect(goNext).toBeEnabled()
    expect(goLast).toBeEnabled()

    userEvent.keyboard('{arrowdown}')
    expect(screen.getByText('11 - 20 of 3664')).toBeInTheDocument()
    expect(goFirst).toBeEnabled()
    expect(goPrev).toBeEnabled()
    expect(goNext).toBeEnabled()
    expect(goLast).toBeEnabled()

    userEvent.keyboard('{shift}{ctrl}{arrowup}')
    expect(screen.getByText('3661 - 3664 of 3664')).toBeInTheDocument()
    expect(goFirst).toBeEnabled()
    expect(goPrev).toBeEnabled()
    expect(goNext).toBeDisabled()
    expect(goLast).toBeDisabled()

    userEvent.keyboard('{shift}{ctrl}{arrowdown}')
    expect(screen.getByText('1 - 10 of 3664')).toBeInTheDocument()
    expect(goFirst).toBeDisabled()
    expect(goPrev).toBeDisabled()
    expect(goNext).toBeEnabled()
    expect(goLast).toBeEnabled()
  })

  test('can be controlled', () => {
    const { rerender } = renderWithProviders(
      <Paginator {...fakeArgs} currentPage={99} onChange={mockedOnChange} />,
    )

    expect(screen.getByText('981 - 990 of 3664')).toBeInTheDocument()
    const [goFirst, goPrev, goNext, goLast] = screen.getAllByRole('button')

    userEvent.click(goNext)
    expect(screen.getByText('981 - 990 of 3664')).toBeInTheDocument()
    expect(mockedOnChange).toBeCalledTimes(1)
    expect(mockedOnChange).toHaveBeenLastCalledWith(100)

    userEvent.click(goPrev)
    expect(screen.getByText('981 - 990 of 3664')).toBeInTheDocument()
    expect(mockedOnChange).toBeCalledTimes(2)
    expect(mockedOnChange).toHaveBeenLastCalledWith(98)

    userEvent.click(goFirst)
    expect(screen.getByText('981 - 990 of 3664')).toBeInTheDocument()
    expect(mockedOnChange).toBeCalledTimes(3)
    expect(mockedOnChange).toHaveBeenLastCalledWith(1)

    userEvent.click(goLast)
    expect(screen.getByText('981 - 990 of 3664')).toBeInTheDocument()
    expect(mockedOnChange).toBeCalledTimes(4)
    expect(mockedOnChange).toHaveBeenLastCalledWith(367)

    rerender(
      <Paginator {...fakeArgs} currentPage={100} onChange={mockedOnChange} />,
    )
    expect(screen.getByText('991 - 1000 of 3664')).toBeInTheDocument()

    rerender(
      <Paginator {...fakeArgs} currentPage={101} onChange={mockedOnChange} />,
    )
    expect(screen.getByText('1001 - 1010 of 3664')).toBeInTheDocument()
  })
})
