import { screen } from '@testing-library/react'
import { renderWithProviders } from 'utils/test'
import { useAuctions } from '../../../contexts/useAuctions'
import { useFilters } from '../../../contexts/useFilters'
import {
  mockedPageData,
  DEFAULT_AUCTIONS_STATE,
  DEFAULT_FILTERS_STATE,
} from './mock'
import AuctionsGrid from '..'

window.HTMLElement.prototype.scrollTo = jest.fn()
jest.mock('../../../contexts/useAuctions', () => ({
  useAuctions: jest.fn(),
}))
jest.mock('../../../contexts/useFilters', () => ({
  useFilters: jest.fn(),
}))
jest.mock('hooks/useIsMounted', () => jest.fn().mockReturnValue(true))

const mockedUseAuctions = useAuctions as jest.MockedFunction<typeof useAuctions>
const mockedUseFilters = useFilters as jest.MockedFunction<typeof useFilters>

describe('<AuctionsGrid />', () => {
  beforeEach(() => {
    process.browser = true

    mockedUseAuctions.mockImplementation(() => ({ ...DEFAULT_AUCTIONS_STATE }))
    mockedUseFilters.mockImplementation(() => ({ ...DEFAULT_FILTERS_STATE }))
  })

  test('should display empty state if there are no characters', () => {
    const { rerender } = renderWithProviders(<AuctionsGrid />)

    expect(
      screen.queryByText('Sorry, no auction was found'),
    ).not.toBeInTheDocument()

    mockedUseAuctions.mockImplementation(() => ({
      ...DEFAULT_AUCTIONS_STATE,
      page: [],
    }))

    rerender(<AuctionsGrid />)

    expect(
      screen.queryByText('Sorry, no auction was found'),
    ).toBeInTheDocument()
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

    mockedUseFilters.mockImplementation(() => ({
      ...DEFAULT_FILTERS_STATE,
      activeFilterCount: 1,
    }))
    rerender(<AuctionsGrid />)

    expect(screen.getByLabelText('1 filter is active')).toBeInTheDocument()

    mockedUseFilters.mockImplementation(() => ({
      ...DEFAULT_FILTERS_STATE,
      activeFilterCount: 5,
    }))
    rerender(<AuctionsGrid />)

    expect(screen.getByLabelText('5 filters are active')).toBeInTheDocument()
  })

  test('paginator should display the correct data', () => {
    const { rerender } = renderWithProviders(<AuctionsGrid />)

    expect(
      screen.getByText(
        `${mockedPageData.startOffset + 1} - ${mockedPageData.endOffset} of ${
          mockedPageData.totalItems
        }`,
      ),
    ).toBeInTheDocument()

    const newPageData: typeof mockedPageData = {
      ...mockedPageData,
      totalItems: 66,
    }
    mockedUseAuctions.mockImplementation(() => ({
      ...DEFAULT_AUCTIONS_STATE,
      pageData: newPageData,
    }))
    rerender(<AuctionsGrid />)

    expect(
      screen.getByText(
        `${newPageData.startOffset + 1} - ${newPageData.endOffset} of ${
          newPageData.totalItems
        }`,
      ),
    ).toBeInTheDocument()
  })
})
