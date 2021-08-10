import { screen } from '@testing-library/react'
import { renderWithRouter } from 'utils/test'
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

describe('<AuctionTimer />', () => {
  describe('it renders Auction Ended message', () => {
    test('for right now', () => {
      renderWithRouter(<AuctionTimer endDate={new Date()} />)

      expect(screen.getByRole('timer')).toHaveTextContent('Auction Ended!')
      expect(screen.getByLabelText('Auction is over')).toBeInTheDocument()
    })

    test('for a past date', () => {
      renderWithRouter(<AuctionTimer endDate={past} />)

      expect(screen.getByRole('timer')).toHaveTextContent('Auction Ended!')
      expect(screen.getByLabelText('Auction is over')).toBeInTheDocument()
    })
  })

  describe('renders endDateString', () => {
    test('for a future date', () => {
      renderWithRouter(<AuctionTimer endDate={future} />)

      expect(screen.getByRole('timer')).toHaveTextContent(/1 Jan/)
      expect(screen.getByLabelText('Auction ends at')).toBeInTheDocument()
      expect(screen.getByText(/0:00/)).toBeInTheDocument()
    })

    test(`for a past date at ${routes.BAZAAR_HISTORY} route`, () => {
      renderWithRouter(<AuctionTimer endDate={past} />, routes.BAZAAR_HISTORY)

      expect(screen.getByRole('timer')).toHaveTextContent(/1 Jan/)
      expect(screen.getByLabelText('Auction finished at')).toBeInTheDocument()
      expect(screen.getByText(/0:00/)).toBeInTheDocument()
    })
  })

  describe('renders countdownTime', () => {
    test('for a hours remaining', () => {
      renderWithRouter(<AuctionTimer endDate={tomorrow} />)

      expect(screen.getByRole('timer')).toHaveTextContent(/23h 59m/)
      expect(screen.getByLabelText('Auction ends in')).toBeInTheDocument()
    })

    test('for minutes remaining', () => {
      renderWithRouter(<AuctionTimer endDate={nextHour} />)

      expect(screen.getByRole('timer')).toHaveTextContent(/59m 59s/)
      expect(screen.getByLabelText('Auction ends in')).toBeInTheDocument()
    })

    test('for seconds remaining', () => {
      renderWithRouter(<AuctionTimer endDate={soon} />)

      expect(screen.getByRole('timer')).toHaveTextContent(/0m 59s/)
      expect(screen.getByLabelText('Auction ends in')).toBeInTheDocument()
    })
  })
})
