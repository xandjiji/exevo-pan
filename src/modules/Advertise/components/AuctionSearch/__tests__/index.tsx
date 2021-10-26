import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithProviders } from 'utils/test'
import { FormProvider } from '../../../contexts/Form'
import AuctionSearch from '..'
import { mockedCharacterData } from './mock'

jest.mock('contexts/useDatabase', () => ({
  useCharacters: () => ({ baseCharacterData: mockedCharacterData }),
}))

window.HTMLElement.prototype.scrollTo = jest.fn()

describe('<AuctionSearch />', () => {
  /* test('should render skeletons on loading', () => {
    renderWithProviders(
      <FormProvider>
        <AuctionSearch />
      </FormProvider>,
    )

    expect(screen.queryAllByText(/Level/)).toHaveLength(0)
  }) */

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
})
