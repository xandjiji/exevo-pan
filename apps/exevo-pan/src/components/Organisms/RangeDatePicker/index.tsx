import { useTranslations } from 'contexts/useTranslation'
import { Fragment, memo, useMemo } from 'react'
import { TitledCard } from 'components/Atoms'
import Weekdays from './Weekdays'
import FillDates from './FillDates'
import FillColumns from './FillColumns'
import { getDatesUntilEnd, partitionByMonths } from './utils'
import * as S from './atoms'
import { RangeDatePickerProps } from './types'

const RangeDatePicker = ({
  endDate,
  selectedDates,
  onDateSelect,
}: RangeDatePickerProps) => {
  const {
    translations: { common },
  } = useTranslations()

  const days = useMemo(() => getDatesUntilEnd(endDate), [endDate])
  const partitionedDates = useMemo(() => partitionByMonths(days), [days])
  const [firstDay] = days
  const selectedStringDates = useMemo(
    () => selectedDates.map((date) => date.toISOString()),
    [selectedDates],
  )

  return (
    <TitledCard
      variant="rounded"
      title={
        <p
          aria-label={common.RangeDatePicker.currentMonthLabel}
          className="text-center tracking-wider"
        >
          {common.FullMonth[new Date().getMonth()]}
        </p>
      }
    >
      <div className="text-tsm grid grid-cols-7 gap-1.5 pt-1 text-center">
        <Weekdays />

        <FillDates firstDay={firstDay} amount={firstDay.getDay()} step={-1} />

        {partitionedDates.map((monthDates, monthIndex) => {
          const monthDatesElements = monthDates.map((date, dayIndex) => {
            const isToday = dayIndex + monthIndex === 0

            const stringDate = date.toISOString()

            return (
              <S.Day
                key={stringDate}
                aria-label={stringDate}
                aria-selected={selectedStringDates.includes(stringDate)}
                today={isToday}
                onClick={() => onDateSelect(date)}
              >
                {new Date(date).getDate()}
              </S.Day>
            )
          })

          const hasNextMonth = monthIndex + 1 < partitionedDates.length
          const currentMonthLastDay = monthDates[monthDates.length - 1]
          const currentMonthLastWeekday = currentMonthLastDay.getDay()

          return (
            <Fragment key={`month-${currentMonthLastDay}`}>
              {monthDatesElements}
              {hasNextMonth && (
                <span
                  aria-label={common.RangeDatePicker.nextMonthLabel}
                  className="text-separator text-s col-span-full -mb-1.5 pt-2 pb-1"
                >
                  {common.FullMonth[(monthDates[0].getMonth() + 1) % 12]}
                </span>
              )}
              {!hasNextMonth && (
                <FillDates
                  firstDay={currentMonthLastDay}
                  amount={6 - currentMonthLastWeekday}
                  step={1}
                />
              )}
              {hasNextMonth && (
                <FillColumns amount={currentMonthLastWeekday + 1} />
              )}
            </Fragment>
          )
        })}
      </div>
    </TitledCard>
  )
}

export default memo(RangeDatePicker)
