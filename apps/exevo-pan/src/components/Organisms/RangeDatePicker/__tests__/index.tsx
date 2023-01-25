import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithProviders } from 'utils/test'
import { MILLISECONDS_IN } from 'utils'
import RangeDatePicker from '..'

type DateState = {
  date: string
  active: string
  element: HTMLElement
}

export const monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

export const monthNameByIndex = (index: number) =>
  monthNames[index + 1 > 11 ? index - 12 : index]

describe('<RangeDatePicker />', () => {
  beforeEach(() => {
    jest.useFakeTimers('modern').setSystemTime(new Date(2020, 9, 1, 7))
  })

  test('should display current and next month correctly', () => {
    renderWithProviders(
      <RangeDatePicker
        endDate={new Date(+new Date() + MILLISECONDS_IN.DAY * 45)}
        onDateSelect={jest.fn()}
        selectedDates={[]}
      />,
    )

    const currentMonthIndex = new Date().getMonth()

    expect(screen.getByLabelText('Current month')).toHaveTextContent(
      monthNameByIndex(currentMonthIndex),
    )
    expect(
      screen.getByText(monthNameByIndex(currentMonthIndex + 1)),
    ).toHaveAccessibleName('Next month')
  })

  test('should toggle dates correctly', () => {
    const endDate = new Date(+new Date() + MILLISECONDS_IN.DAY * 45)
    let selectedDates: Date[] = []

    const onDateSelect = (date: Date) => {
      const dateSet = new Set(
        selectedDates.map((dateItem) => dateItem.toISOString()),
      )

      const selectedIsoDate = date.toISOString()
      if (dateSet.has(selectedIsoDate)) {
        dateSet.delete(selectedIsoDate)
      } else {
        dateSet.add(selectedIsoDate)
      }

      selectedDates = [...dateSet].map((isoDate) => new Date(isoDate))
    }

    const { rerender } = renderWithProviders(
      <RangeDatePicker
        endDate={endDate}
        onDateSelect={onDateSelect}
        selectedDates={selectedDates}
      />,
    )

    const updateState = () =>
      rerender(
        <RangeDatePicker
          endDate={endDate}
          onDateSelect={onDateSelect}
          selectedDates={selectedDates}
        />,
      )

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
        updateState()

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
})
