import { screen } from '@testing-library/react'
import { useRouter, NextRouter } from 'next/router'
import { renderWithProviders } from 'utils/test'
import { routes } from 'Constants'
import AuctionTimer from '..'
import {
  MILLISECONDS_IN_A_DAY,
  MILLISECONDS_IN_AN_HOUR,
  MILLISECONDS_IN_A_MINUTE,
} from '../utils'

const past = new Date('01/01/1999')
const future = new Date('3000-01-01T03:00:00.000Z')
const tomorrow = new Date(Date.now() + MILLISECONDS_IN_A_DAY + 1)
const nextHour = new Date(Date.now() + MILLISECONDS_IN_AN_HOUR + 1)
const soon = new Date(Date.now() + MILLISECONDS_IN_A_MINUTE + 1)

const mockedUseRouter = useRouter as jest.MockedFunction<typeof useRouter>

describe('<AuctionTimer />', () => {
  beforeEach(() => {
    mockedUseRouter.mockReturnValue({
      pathname: routes.HOME,
    } as NextRouter)
  })
  describe('it renders Auction Ended message', () => {
    test('for right now', () => {
      renderWithProviders(<AuctionTimer endDate={new Date()} />)

      expect(screen.getByRole('timer')).toHaveTextContent('Auction Ended!')
      expect(screen.getByLabelText('Auction is over')).toBeInTheDocument()
    })

    test('for a past date', () => {
      renderWithProviders(<AuctionTimer endDate={past} />)

      expect(screen.getByRole('timer')).toHaveTextContent('Auction Ended!')
      expect(screen.getByLabelText('Auction is over')).toBeInTheDocument()
    })
  })

  describe('renders endDateString', () => {
    test('for a future date', () => {
      renderWithProviders(<AuctionTimer endDate={future} />)

      expect(screen.getByRole('timer')).toHaveTextContent(/1 Jan/)
      expect(screen.getByLabelText('Auction ends at')).toBeInTheDocument()
      expect(screen.getByText(/0:00/)).toBeInTheDocument()
    })

    test(`for a past date at ${routes.BAZAAR_HISTORY} route`, () => {
      mockedUseRouter.mockReturnValue({
        pathname: routes.BAZAAR_HISTORY,
      } as NextRouter)
      renderWithProviders(<AuctionTimer endDate={past} />)

      expect(screen.getByRole('timer')).toHaveTextContent(/1 Jan/)
      expect(screen.getByLabelText('Auction finished at')).toBeInTheDocument()
      expect(screen.getByText(/0:00/)).toBeInTheDocument()
    })
  })

  describe('renders countdownTime', () => {
    test('for a hours remaining', () => {
      renderWithProviders(<AuctionTimer endDate={tomorrow} />)

      expect(screen.getByRole('timer')).toHaveTextContent(/23h 59m/)
      expect(screen.getByLabelText('Auction ends in')).toBeInTheDocument()
    })

    test('for minutes remaining', () => {
      renderWithProviders(<AuctionTimer endDate={nextHour} />)

      expect(screen.getByRole('timer')).toHaveTextContent(/59m 59s/)
      expect(screen.getByLabelText('Auction ends in')).toBeInTheDocument()
    })

    test('for seconds remaining', () => {
      renderWithProviders(<AuctionTimer endDate={soon} />)

      expect(screen.getByRole('timer')).toHaveTextContent(/0m 59s/)
      expect(screen.getByLabelText('Auction ends in')).toBeInTheDocument()
    })
  })
})
