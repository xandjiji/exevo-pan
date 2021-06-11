import { screen } from '@testing-library/react'
import { renderWithRouter } from '../../../../utils/test'
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
      expect(screen.getByText('Auction Ended!')).toBeInTheDocument()
    })

    test('for a past date', () => {
      renderWithRouter(<AuctionTimer endDate={past} />)
      expect(screen.getByText('Auction Ended!')).toBeInTheDocument()
    })
  })

  describe('renders endDateString', () => {
    test('for a future date', () => {
      renderWithRouter(<AuctionTimer endDate={future} />)
      expect(screen.getByText(/1 Jan/)).toBeInTheDocument()
      expect(screen.getByText(/0:00/)).toBeInTheDocument()
    })

    test('for a past date at /bazaar-history route', () => {
      renderWithRouter(<AuctionTimer endDate={past} />, '/bazaar-history')
      expect(screen.getByText(/1 Jan/)).toBeInTheDocument()
      expect(screen.getByText(/0:00/)).toBeInTheDocument()
    })
  })

  describe('renders countdownTime', () => {
    test('for a hours remaining', () => {
      renderWithRouter(<AuctionTimer endDate={tomorrow} />)
      expect(screen.getByText(/23h 59m/)).toBeInTheDocument()
    })

    test('for minutes remaining', () => {
      renderWithRouter(<AuctionTimer endDate={nextHour} />)
      expect(screen.getByText(/59m 59s/)).toBeInTheDocument()
    })

    test('for seconds remaining', () => {
      renderWithRouter(<AuctionTimer endDate={soon} />)
      expect(screen.getByText(/0m 59s/)).toBeInTheDocument()
    })
  })
})
