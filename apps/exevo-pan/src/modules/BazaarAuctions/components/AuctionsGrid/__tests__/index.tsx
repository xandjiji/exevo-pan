import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithProviders, setup } from 'utils/test'
import { useAuctions } from '../../../contexts/useAuctions'
import { mockedPaginatedData, DEFAULT_AUCTIONS_STATE } from './mock'
import AuctionsGrid from '..'

window.HTMLElement.prototype.scrollTo = jest.fn()
jest.mock('../../../contexts/useAuctions', () => ({
  useAuctions: jest.fn(),
}))
jest.mock('hooks/useIsMounted', () => jest.fn().mockReturnValue(true))

const mockedUseAuctions = useAuctions as jest.MockedFunction<typeof useAuctions>

describe('<AuctionsGrid />', () => {
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
    })
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
    })

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

  test.todo('filters should appear and be controlled by tags')

  test.todo('highlighted auctions should not be displayed on favorites mode')

  test.todo('grid mode should only update after it has settled')

  test.todo('filter button should be disabled if in favorites mode')

  test.todo('not found favorite auctions should be displayed in an alert')

  test.todo(
    'in favorite mode, history auctions and current auctions should be separated',
  )
})
