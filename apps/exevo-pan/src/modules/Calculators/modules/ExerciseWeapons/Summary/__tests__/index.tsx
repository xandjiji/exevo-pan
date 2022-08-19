import { screen } from '@testing-library/react'
import { renderWithProviders } from 'utils/test'
import Summary from '..'

type Case = {
  pointsRequired: number
  cost: {
    tc: string
    gold: string
  }
  regular: number
  durable: number
  lasting: number
  days: number
  hours: number
  minutes: number
}

const normalCases: Case[] = [
  {
    pointsRequired: 4248234,
    cost: {
      tc: '370',
      gold: '3,885,000',
    },
    regular: 4,
    durable: 3,
    lasting: 0,
    days: 0,
    hours: 4,
    minutes: 7,
  },
  {
    pointsRequired: 8915,
    cost: {
      tc: '25',
      gold: '262,500',
    },
    regular: 1,
    durable: 0,
    lasting: 0,
    days: 0,
    hours: 0,
    minutes: 17,
  },
  {
    pointsRequired: 9847465155,
    cost: {
      tc: '820,645',
      gold: '8,616,772,500',
    },
    regular: 1,
    durable: 6,
    lasting: 1139,
    days: 379,
    hours: 22,
    minutes: 17,
  },
]

const assertWeapon = (
  type: 'regular' | 'durable' | 'lasting',
  amount: number,
) => {
  const element = screen.getByText(`${type} weapons`)
  expect(element.textContent).toBe(` ${type} weapons${amount}x`)
  expect(element).toHaveAttribute('aria-hidden', amount > 0 ? 'false' : 'true')
}

const assertTime = (type: 'day' | 'hour' | 'minute', amount: number) => {
  const element = screen.getByText(`${type}${amount > 1 ? 's' : ''}`)
  expect(element.previousSibling).toHaveTextContent(amount.toString())
  expect(element.parentElement).toHaveAttribute(
    'aria-hidden',
    amount > 0 ? 'false' : 'true',
  )
}

describe('<Summary />', () => {
  test.each(normalCases)(
    'should display the correct summary data',
    ({
      pointsRequired,
      cost,
      regular,
      durable,
      lasting,
      days,
      hours,
      minutes,
    }) => {
      renderWithProviders(<Summary pointsRequired={pointsRequired} />)

      expect(screen.getByText(cost.tc)).toBeInTheDocument()
      expect(screen.getByText(cost.gold)).toBeInTheDocument()

      assertWeapon('regular', regular)
      assertWeapon('durable', durable)
      assertWeapon('lasting', lasting)

      assertTime('day', days)
      assertTime('hour', hours)
      assertTime('minute', minutes)
    },
  )
})
