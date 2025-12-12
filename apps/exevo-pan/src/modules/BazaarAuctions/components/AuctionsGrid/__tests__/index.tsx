import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithProviders, setup } from 'utils/test'
import { useAuctions } from '../../../contexts/useAuctions'
import { DEFAULT_AUCTIONS_STATE, mockedPaginatedData } from './mock'
import AuctionsGrid from '..'

window.HTMLElement.prototype.scrollTo = jest.fn()
jest.mock('../../../contexts/useAuctions', () => ({
  useAuctions: jest.fn(),
}))
jest.mock('hooks/useIsMounted', () => jest.fn().mockReturnValue(true))

const mockedUseAuctions = useAuctions as jest.MockedFunction<typeof useAuctions>

describe.skip('<AuctionsGrid />', () => {
  beforeEach(() => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    process.browser = true

    mockedUseAuctions.mockImplementation(() => ({ ...DEFAULT_AUCTIONS_STATE }))
    setup.useSession().mockReturnValue({
      data: {
        user: {
          proStatus: true,
        },
      } as any,
      status: 'unauthenticated',
    } as any)
  })

  test('should display empty state if there are no characters', () => {
    const { rerender } = renderWithProviders(<AuctionsGrid />)

    expect(
      screen.queryByText('Sorry, no auction was found'),
    ).not.toBeInTheDocument()

    mockedUseAuctions.mockImplementation(() => ({
      ...DEFAULT_AUCTIONS_STATE,
      paginatedData: {
        ...DEFAULT_AUCTIONS_STATE.paginatedData,
        page: [],
      },
    }))

    rerender(<AuctionsGrid />)

    expect(
      screen.queryByText('Sorry, no auction was found'),
    ).toBeInTheDocument()

    userEvent.click(screen.getByRole('button', { name: 'Change filters' }))
    expect(screen.getByText('Filters')).toBeInTheDocument()
  })

  test('should display highlighted characters', () => {
    const { rerender } = renderWithProviders(<AuctionsGrid />)

    DEFAULT_AUCTIONS_STATE.highlightedAuctions.forEach(({ nickname }) => {
      expect(screen.queryByText(nickname)).not.toBeInTheDocument()
    })

    mockedUseAuctions.mockImplementation(() => ({
      ...DEFAULT_AUCTIONS_STATE,
      shouldDisplayHighlightedAuctions: true,
    }))

    rerender(<AuctionsGrid />)

    DEFAULT_AUCTIONS_STATE.highlightedAuctions.forEach(({ nickname }) => {
      expect(screen.queryByText(nickname)).toBeInTheDocument()
    })
  })

  test('should display active filter count', () => {
    const { rerender } = renderWithProviders(<AuctionsGrid />)

    expect(screen.getByLabelText('0 filters are active')).toBeInTheDocument()

    mockedUseAuctions.mockImplementation(() => ({
      ...DEFAULT_AUCTIONS_STATE,
      activeFilterCount: 1,
    }))
    rerender(<AuctionsGrid />)

    expect(screen.getByLabelText('1 filter is active')).toBeInTheDocument()

    mockedUseAuctions.mockImplementation(() => ({
      ...DEFAULT_AUCTIONS_STATE,
      activeFilterCount: 5,
    }))
    rerender(<AuctionsGrid />)

    expect(screen.getByLabelText('5 filters are active')).toBeInTheDocument()
  })

  test('paginator should display the correct data', () => {
    const { rerender } = renderWithProviders(<AuctionsGrid />)

    expect(
      screen.getByText(
        `${mockedPaginatedData.startOffset + 1} - ${
          mockedPaginatedData.endOffset
        } of ${mockedPaginatedData.totalItems}`,
      ),
    ).toBeInTheDocument()

    const newPaginatedData: typeof mockedPaginatedData = {
      ...mockedPaginatedData,
      totalItems: 66,
    }
    mockedUseAuctions.mockImplementation(() => ({
      ...DEFAULT_AUCTIONS_STATE,
      paginatedData: newPaginatedData,
    }))
    rerender(<AuctionsGrid />)

    expect(
      screen.getByText(
        `${newPaginatedData.startOffset + 1} - ${
          newPaginatedData.endOffset
        } of ${newPaginatedData.totalItems}`,
      ),
    ).toBeInTheDocument()
  })

  test('should open the filter drawer', () => {
    renderWithProviders(<AuctionsGrid />)

    userEvent.click(screen.getByRole('button', { name: 'Open filter drawer' }))
    expect(screen.getByText('Filters')).toBeInTheDocument()
  })

  test('should display tc invested for highlighted auctions', () => {
    setup.useSession().mockReturnValue({
      data: {
        user: {
          proStatus: false,
        },
      } as any,
      status: 'unauthenticated',
    } as any)

    const highlightedAuction: CharacterObject = {
      ...DEFAULT_AUCTIONS_STATE.paginatedData.page[2],
      tcInvested: 123456,
    }
    mockedUseAuctions.mockImplementation(() => ({
      ...DEFAULT_AUCTIONS_STATE,
      highlightedAuctions: [highlightedAuction],
    }))
    renderWithProviders(<AuctionsGrid />)

    expect(screen.getByText(/123,456 invested/gi)).toBeInTheDocument()
  })

  test('filters should appear and be controlled by tags', () => {
    mockedUseAuctions.mockImplementation(() => ({
      ...DEFAULT_AUCTIONS_STATE,
      filterState: {
        ...DEFAULT_AUCTIONS_STATE.filterState,
        dummy: true,
        maxLevel: 2950,
        skillKey: new Set(['distance']),
        minSkill: 60,
        rareNick: true,
      },
    }))

    renderWithProviders(<AuctionsGrid />)

    expect(screen.getByText(/training dummy/i)).toBeInTheDocument()
    expect(screen.getByText(/max level:/i)).toBeInTheDocument()
    expect(screen.getByText(/distance:/i)).toBeInTheDocument()
    expect(screen.getByText(/rare nickname/i)).toBeInTheDocument()

    expect(DEFAULT_AUCTIONS_STATE.dispatch).toHaveBeenCalledTimes(0)
    userEvent.click(screen.getAllByRole('button', { name: 'Remove item' })[0])
    expect(DEFAULT_AUCTIONS_STATE.dispatch).toHaveBeenCalledTimes(1)
  })

  test('grid mode should be updated', () => {
    const { rerender } = renderWithProviders(<AuctionsGrid />)

    expect(
      screen.getByRole('button', { name: 'Current auctions' }),
    ).toBeInTheDocument()

    mockedUseAuctions.mockImplementation(() => ({
      ...DEFAULT_AUCTIONS_STATE,
      mode: 'favorites',
      loading: true,
    }))
    rerender(<AuctionsGrid />)

    expect(
      screen.getByRole('button', { name: 'Favorites' }),
    ).toBeInTheDocument()
  })

  test('filter button should be disabled if in favorites mode', () => {
    const { rerender } = renderWithProviders(<AuctionsGrid />)

    expect(
      screen.getByRole('button', { name: 'Open filter drawer' }),
    ).toBeEnabled()

    mockedUseAuctions.mockImplementation(() => ({
      ...DEFAULT_AUCTIONS_STATE,
      mode: 'favorites',
      loading: false,
    }))

    rerender(<AuctionsGrid />)

    expect(
      screen.getByRole('button', { name: 'Open filter drawer' }),
    ).toBeDisabled()
  })

  test('not found favorite auctions should be displayed in an alert', () => {
    mockedUseAuctions.mockImplementation(() => ({
      ...DEFAULT_AUCTIONS_STATE,
      mode: 'favorites',
      favoritedState: {
        ...DEFAULT_AUCTIONS_STATE.favoritedState,
        notFoundIds: [123, 456],
      },
    }))

    renderWithProviders(<AuctionsGrid />)

    expect(screen.getByRole('alert')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /123/g })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /456/g })).toBeInTheDocument()
  })

  test('in favorite mode, history auctions and current auctions should be separated', () => {
    const [a, b, c, ...rest] = DEFAULT_AUCTIONS_STATE.paginatedData.page.map(
      ({ id }) => id,
    )
    mockedUseAuctions.mockImplementation(() => ({
      ...DEFAULT_AUCTIONS_STATE,
      mode: 'favorites',
      favoritedState: {
        ...DEFAULT_AUCTIONS_STATE.favoritedState,
        currentIds: [a, b, c],
        historyIds: [...rest],
      },
    }))

    renderWithProviders(<AuctionsGrid />)

    expect(screen.getByText(/current auctions/i).textContent).toEqual(
      'Current auctions (3)',
    )
    expect(screen.getByText(/bazaar history/i).textContent).toEqual(
      'Bazaar history (7)',
    )
  })
})
