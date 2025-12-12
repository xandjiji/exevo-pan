import { screen } from '@testing-library/react'
import { renderWithProviders } from 'utils/test'
import FillDates from '../FillDates'

describe('<FillDates />', () => {
  test('should fill with days forwards', () => {
    renderWithProviders(
      <FillDates firstDay={new Date('12/24/2021')} amount={8} step={1} />,
    )

    const days = ['25', '26', '27', '28', '29', '30', '31', '1']
    days.forEach((day) => expect(screen.getByText(day)).toBeInTheDocument())
  })

  test('should fill with days backwards', () => {
    renderWithProviders(
      <FillDates firstDay={new Date('01/03/2021')} amount={5} step={-1} />,
    )

    const days = ['2', '1', '31', '30', '29']
    days.forEach((day) => expect(screen.getByText(day)).toBeInTheDocument())
  })
})
