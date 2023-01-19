import { useEffect } from 'react'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithProviders } from 'utils/test'
import FutureRangeDatePicker from '..'

import { mockedSelectedCharacter, currentMonth, nextMonth } from './mock'

type DateState = {
  date: string
  active: string
  element: HTMLElement
}

/* @ ToDo: write tests */

/* describe('<FutureRangeDatePicker />', () => {
  test('should display current and next month correctly', () => {
    renderWithProviders(<FutureRangeDatePicker />)

    expect(screen.getByLabelText('Current month')).toHaveTextContent(
      currentMonth,
    )
    expect(screen.getByText(nextMonth)).toHaveAccessibleName('Next month')
  })

  test('should toggle dates correctly', () => {
    renderWithProviders(<FutureRangeDatePicker />)

    const dateButtons = screen.getAllByRole('button')
    const dateStates: DateState[] = dateButtons
      .map((dateButton) => ({
        date: dateButton.getAttribute('aria-label') as string,
        active: dateButton.getAttribute('aria-selected') as string,
        element: dateButton,
      }))
      .filter((dataState) => dataState.date)

    expect(dateStates).toHaveLength(46)

    const toggleAndAssertDates = () => {
      dateStates.forEach((dateState, index) => {
        const buttonElement = screen.getByLabelText(dateState.date)

        expect(buttonElement).toHaveAttribute('aria-selected', dateState.active)

        userEvent.click(dateState.element)

        expect(buttonElement).not.toHaveAttribute(
          'aria-selected',
          dateState.active,
        )

        dateStates[index] = {
          ...dateState,
          active: buttonElement.getAttribute('aria-selected') as string,
        }
      })
    }

    toggleAndAssertDates()
    toggleAndAssertDates()
    toggleAndAssertDates()
  })
}) */
