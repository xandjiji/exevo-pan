import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithProviders, setup } from 'utils/test'
import { cases, SummaryData } from './mock'
import Summary from '..'

setup.scrollIntoView()
setup.URLSearchParams.get()

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

const assertSummary = ({
  cost,
  regular,
  durable,
  lasting,
  days,
  hours,
  minutes,
}: SummaryData) => {
  expect(screen.getByText(cost.tc)).toBeInTheDocument()
  expect(screen.getByText(cost.gold)).toBeInTheDocument()

  assertWeapon('regular', regular)
  assertWeapon('durable', durable)
  assertWeapon('lasting', lasting)

  assertTime('day', days)
  assertTime('hour', hours)
  assertTime('minute', minutes)
}

describe('<Summary />', () => {
  test.each(cases)(
    'should display the correct summary data',
    ({ pointsRequired, summaries }) => {
      renderWithProviders(<Summary pointsRequired={pointsRequired} />)

      assertSummary(summaries[0])

      userEvent.click(screen.getByLabelText('Exercise dummy'))
      assertSummary(summaries[1])

      userEvent.click(screen.getByLabelText('Double event'))
      assertSummary(summaries[2])

      userEvent.click(screen.getByText('Auto'))
      userEvent.click(screen.getByText('Durable (1800 charges)'))
      assertSummary(summaries[3])
    },
  )
})
