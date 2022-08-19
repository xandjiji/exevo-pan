import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithProviders } from 'utils/test'
import * as cases from './mock'
import Summary from '..'

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
}: Omit<cases.Case, 'pointsRequired'>) => {
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
  test.each(cases.normal)(
    'should display the correct summary data',
    ({ pointsRequired, ...summary }) => {
      renderWithProviders(<Summary pointsRequired={pointsRequired} />)

      assertSummary(summary)
    },
  )

  test.each(cases.exerciseDummy)(
    'should display the correct summary data with exercise dummy',
    ({ pointsRequired, ...summary }) => {
      renderWithProviders(<Summary pointsRequired={pointsRequired} />)

      userEvent.click(screen.getByLabelText('Exercise dummy'))
      assertSummary(summary)
    },
  )
})
