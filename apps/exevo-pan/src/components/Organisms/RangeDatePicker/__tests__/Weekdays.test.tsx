import { screen } from '@testing-library/react'
import { renderWithProviders } from 'utils/test'
import Weekdays from '../Weekdays'

describe('<Weekdays />', () => {
  test('should render all weekdays', () => {
    renderWithProviders(<Weekdays />)

    const fullWeekdays = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ]

    fullWeekdays.forEach((weekday) =>
      expect(screen.getByLabelText(weekday)).toBeInTheDocument(),
    )
  })
})
