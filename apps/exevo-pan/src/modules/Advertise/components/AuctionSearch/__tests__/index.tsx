import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithProviders } from 'utils/test'
import { useAuctions } from '../../../contexts/useAuctions'
import { FormProvider } from '../../../contexts/Form'
import AuctionSearch, { PAGE_SIZE } from '..'
import { mockedPage, mockedPageData } from './mock'

jest.mock('../../../contexts/useAuctions', () => ({
  useAuctions: jest.fn(),
}))

const mockedUseAuctions = useAuctions as jest.MockedFunction<typeof useAuctions>
const mockedHandlePaginatorFetch = jest.fn()
const mockedHandleNicknameFetch = jest.fn()

const defaultState = {
  nickname: '',
  loading: false,
  page: mockedPage,
  pageData: mockedPageData,
  handlePaginatorFetch: mockedHandlePaginatorFetch,
  handleNicknameFetch: mockedHandleNicknameFetch,
}
window.HTMLElement.prototype.scrollTo = jest.fn()

describe('<AuctionSearch />', () => {
  beforeEach(() => {
    mockedUseAuctions.mockClear()
    mockedHandlePaginatorFetch.mockClear()
    mockedHandleNicknameFetch.mockClear()
  })

  test('should render all characters', () => {
    mockedUseAuctions.mockImplementation(() => ({
      ...defaultState,
    }))

    renderWithProviders(
      <FormProvider>
        <AuctionSearch />
      </FormProvider>,
    )

    mockedPage.forEach(({ nickname }) => {
      expect(screen.getByText(nickname)).toBeInTheDocument()
    })
  })

  test('should display empty state', () => {
    mockedUseAuctions.mockImplementation(() => ({
      ...defaultState,
      page: [],
    }))

    renderWithProviders(
      <FormProvider>
        <AuctionSearch />
      </FormProvider>,
    )

    expect(screen.getByAltText('No auction was found')).toBeInTheDocument()
  })

  test('should select the characters correctly', () => {
    mockedUseAuctions.mockImplementation(() => ({
      ...defaultState,
    }))

    const { container } = renderWithProviders(
      <FormProvider>
        <AuctionSearch />
      </FormProvider>,
    )

    const auctionButtons = container.querySelectorAll('#auction-list button')
    auctionButtons.forEach((button) => {
      userEvent.click(button)

      expect(button).toHaveAttribute('aria-selected', 'true')
    })
  })

  test('should search for nickname', async () => {
    mockedUseAuctions.mockImplementation(() => ({
      ...defaultState,
    }))

    renderWithProviders(
      <FormProvider>
        <AuctionSearch />
      </FormProvider>,
    )

    const searchInput = screen.getByPlaceholderText('Nickname')
    userEvent.type(searchInput, 'Ksu')

    await waitFor(() => {
      expect(mockedHandleNicknameFetch).toHaveBeenCalledWith('Ksu')
    })
  })

  test('should call the pagination service', () => {
    mockedUseAuctions.mockImplementation(() => ({
      ...defaultState,
    }))

    renderWithProviders(
      <FormProvider>
        <AuctionSearch />
      </FormProvider>,
    )

    const nextPageButton = screen.getByLabelText('Go to next page')
    userEvent.click(nextPageButton)
    expect(mockedHandlePaginatorFetch).toHaveBeenLastCalledWith(
      mockedPageData.pageIndex + 2,
    )

    const lastPageButton = screen.getByLabelText('Go to last page')
    userEvent.click(lastPageButton)
    expect(mockedHandlePaginatorFetch).toHaveBeenLastCalledWith(
      mockedPageData.totalItems / PAGE_SIZE,
    )
  })
})
