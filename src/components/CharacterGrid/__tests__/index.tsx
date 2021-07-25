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

    userEvent.click(screen.getByLabelText('Set the sorting order and criteria'))
    userEvent.click(screen.getByLabelText('Sort by descending order'))
    expect(mockScrollTo).toHaveBeenCalledTimes(3)

    userEvent.click(screen.getAllByRole('radio')[3])
    expect(mockScrollTo).toHaveBeenCalledTimes(4)

    await waitFor(() => {})
  })

  test.todo(
    'test page reset cases (characterData length/sort change bidded only)',
  )

  test.todo('test default sortMode/descendingOrder on router change + rerender')

  test.todo('skeleton rendering (rerender isLoading)')

  test.todo('test sorting/ordering')
})
