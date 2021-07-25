import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithProviders, randomDataset } from 'utils/test'
import CharacterGrid from '..'

/*
    We are using 'await waitFor(() => {})' at the end
    of each test to get rid of unexpected warnings.
    This is a issue with react-popper. See:
    https://github.com/popperjs/react-popper/issues/368
*/

jest.mock('lodash', () => ({
  debounce: fn => fn,
}))

const { characterData } = randomDataset()
const mockScrollTo = jest.fn()
window.HTMLElement.prototype.scrollTo = mockScrollTo

describe('<CharacterGrid />', () => {
  beforeEach(() => {
    /* @ ToDo: add this to jest setup */
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation(() => ({
        matches: false,
      })),
    })

    mockScrollTo.mockClear()
  })

  test('should scroll grid to top on interactions', async () => {
    const { rerender } = renderWithProviders(
      <CharacterGrid characterList={characterData} isLoading={false} />,
    )

    expect(mockScrollTo).toHaveBeenCalledTimes(1)

    rerender(
      <CharacterGrid
        characterList={characterData.slice(0, 100)}
        isLoading={false}
      />,
    )
    expect(mockScrollTo).toHaveBeenCalledTimes(2)

    userEvent.click(screen.getByLabelText('Go to last page'))
    expect(mockScrollTo).toHaveBeenCalledTimes(3)

    userEvent.click(screen.getByLabelText('Set the sorting order and criteria'))
    userEvent.click(screen.getByLabelText('Sort by descending order'))
    expect(mockScrollTo).toHaveBeenCalledTimes(4)

    userEvent.click(screen.getAllByRole('radio')[1])
    expect(mockScrollTo).toHaveBeenCalledTimes(5)

    await waitFor(() => {})
  })

  test('should reset paging on character list length change)', async () => {
    const { rerender } = renderWithProviders(
      <CharacterGrid characterList={characterData} isLoading={false} />,
    )

    userEvent.click(screen.getByLabelText('Go to last page'))
    expect(screen.getByText('9991 - 10000 of 10000')).toBeInTheDocument()

    rerender(
      <CharacterGrid
        characterList={characterData.slice(0, 100)}
        isLoading={false}
      />,
    )
    expect(screen.getByText('1 - 10 of 100')).toBeInTheDocument()

    userEvent.click(screen.getByLabelText('Go to last page'))
    expect(screen.getByText('91 - 100 of 100')).toBeInTheDocument()

    userEvent.click(screen.getByLabelText('Set the sorting order and criteria'))
    userEvent.click(screen.getByLabelText('Sort by descending order'))
    expect(screen.getByText('91 - 100 of 100')).toBeInTheDocument()

    userEvent.click(screen.getAllByRole('radio')[2])
    expect(screen.getByText('91 - 100 of 100')).toBeInTheDocument()

    userEvent.click(screen.getAllByRole('radio')[3])
    expect(screen.queryByText('91 - 100 of 100')).not.toBeInTheDocument()

    await waitFor(() => {})
  })

  test.todo('test default sortMode/descendingOrder on router change + rerender')

  test.todo('skeleton rendering (rerender isLoading)')

  test.todo('test sorting/ordering')
})
