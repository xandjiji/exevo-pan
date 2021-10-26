import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithProviders } from 'utils/test'
import { useCharacters } from 'contexts/useDatabase'
import { CharactersContextValues } from 'contexts/useDatabase/types'
import { FormProvider } from '../../../contexts/Form'
import AuctionSearch from '..'
import { mockedCharacterData } from './mock'

jest.mock('contexts/useDatabase', () => ({
  useCharacters: jest.fn(),
}))

const mockedUseCharacters = useCharacters as jest.MockedFunction<
  typeof useCharacters
>

window.HTMLElement.prototype.scrollTo = jest.fn()

describe('<AuctionSearch />', () => {
  beforeEach(() => {
    mockedUseCharacters.mockImplementation(
      () =>
        ({
          baseCharacterData: mockedCharacterData,
          loading: false,
        } as CharactersContextValues),
    )
  })

  test('should render skeletons on loading', () => {
    mockedUseCharacters.mockImplementation(
      () =>
        ({
          baseCharacterData: [] as CharacterObject[],
          loading: true,
        } as CharactersContextValues),
    )

    renderWithProviders(
      <FormProvider>
        <AuctionSearch />
      </FormProvider>,
    )

    expect(screen.queryAllByText(/Level/)).toHaveLength(0)
    expect(
      screen.queryByAltText('No auction was found'),
    ).not.toBeInTheDocument()
  })

  test('should page data correctly', () => {
    renderWithProviders(
      <FormProvider>
        <AuctionSearch />
      </FormProvider>,
    )

    const nextButton = screen.getByRole('button', { name: 'Go to next page' })
    const prevButton = screen.getByRole('button', {
      name: 'Go to previous page',
    })

    const firstButton = screen.getByRole('button', { name: 'Go to first page' })
    const lastButton = screen.getByRole('button', { name: 'Go to last page' })

    mockedCharacterData.slice(0, 10).forEach((character) => {
      expect(screen.getByText(character.nickname)).toBeInTheDocument()
    })

    userEvent.click(nextButton)
    mockedCharacterData.slice(10, 20).forEach((character) => {
      expect(screen.getByText(character.nickname)).toBeInTheDocument()
    })

    userEvent.click(lastButton)
    mockedCharacterData
      .slice(mockedCharacterData.length - 10, mockedCharacterData.length)
      .forEach((character) => {
        expect(screen.getByText(character.nickname)).toBeInTheDocument()
      })

    userEvent.click(prevButton)
    mockedCharacterData
      .slice(mockedCharacterData.length - 20, mockedCharacterData.length - 10)
      .forEach((character) => {
        expect(screen.getByText(character.nickname)).toBeInTheDocument()
      })

    userEvent.click(firstButton)
    mockedCharacterData.slice(0, 10).forEach((character) => {
      expect(screen.getByText(character.nickname)).toBeInTheDocument()
    })
  })

  test('should filter by nickname', () => {
    renderWithProviders(
      <FormProvider>
        <AuctionSearch />
      </FormProvider>,
    )

    const randomNickname = mockedCharacterData[200].nickname

    userEvent.type(screen.getByPlaceholderText('Nickname'), randomNickname)
    expect(screen.queryAllByText(randomNickname).length > 0).toBeTruthy()

    userEvent.click(screen.getByRole('button', { name: 'Clear input' }))
    mockedCharacterData.slice(0, 10).forEach((character) => {
      expect(screen.getByText(character.nickname)).toBeInTheDocument()
    })
  })

  test('should display empty state', () => {
    renderWithProviders(
      <FormProvider>
        <AuctionSearch />
      </FormProvider>,
    )

    userEvent.type(screen.getByPlaceholderText('Nickname'), 'asdsa0d0sd0ad0a')
    expect(screen.getByAltText('No auction was found')).toBeInTheDocument()
  })

  test('should select the characters correctly', () => {
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
})
