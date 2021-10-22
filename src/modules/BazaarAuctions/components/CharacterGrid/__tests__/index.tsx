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

jest.setTimeout(15000)

const { characterData } = randomDataset()
const mockScrollTo = jest.fn()
window.HTMLElement.prototype.scrollTo = mockScrollTo

jest.mock('hooks/useIsMounted', () => jest.fn().mockReturnValue(true))

describe('<CharacterGrid />', () => {
  beforeEach(() => {
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

  test('should change default sort/order mode by props', async () => {
    const { rerender } = renderWithProviders(
      <CharacterGrid characterList={characterData} isLoading={false} />,
    )

    userEvent.click(screen.getByLabelText('Set the sorting order and criteria'))
    const orderSwitch = screen.getByRole('switch')
    const [auctionEnd, , , biddedOnly] = screen.getAllByRole('radio')
    expect(orderSwitch).not.toBeChecked()
    expect(auctionEnd).toBeChecked()
    expect(biddedOnly).not.toBeChecked()
    expect(screen.getByText('1 - 10 of 10000')).toBeInTheDocument()

    rerender(
      <CharacterGrid
        characterList={characterData}
        isLoading={false}
        defaultDescendingOrder
        defaultSortMode={3}
      />,
    )

    await waitFor(() => {
      expect(orderSwitch).toBeChecked()
      expect(auctionEnd).not.toBeChecked()
      expect(biddedOnly).toBeChecked()
      expect(screen.queryByText('1 - 10 of 10000')).not.toBeInTheDocument()
    })

    await waitFor(() => {})
  })

  test('should display skeletons while loading', async () => {
    const { rerender } = renderWithProviders(
      <CharacterGrid characterList={[]} isLoading />,
    )

    expect(screen.queryAllByText('Bid status')).toHaveLength(10)

    rerender(<CharacterGrid characterList={characterData} isLoading={false} />)
    rerender(<CharacterGrid characterList={characterData} isLoading={false} />)

    expect(screen.queryByText('Bid status')).not.toBeInTheDocument()

    await waitFor(() => {})
  })

  test('should display empty state if there are no characters', async () => {
    const { rerender } = renderWithProviders(
      <CharacterGrid characterList={characterData} isLoading={false} />,
    )

    rerender(<CharacterGrid characterList={[]} isLoading={false} />)

    expect(screen.getByText('Sorry, no auction was found')).toBeInTheDocument()

    userEvent.click(screen.getByRole('button', { name: 'Change filters' }))
    await waitFor(() => {
      expect(screen.getByLabelText('Filter form')).toBeVisible()
    })

    await waitFor(() => {})
  })

  test('should display highlighted characters', async () => {
    const gridComponent = (
      <CharacterGrid
        characterList={characterData}
        highlightedList={[
          { ...characterData[0], nickname: 'HIGHLIGHTED CHARACTER' },
        ]}
        isLoading={false}
      />
    )

    const { rerender } = renderWithProviders(gridComponent)
    rerender(gridComponent)

    expect(screen.getByText('HIGHLIGHTED CHARACTER')).toBeInTheDocument()

    await waitFor(() => {})
  })
})
