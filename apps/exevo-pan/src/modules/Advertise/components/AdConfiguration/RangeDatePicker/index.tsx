import { useTranslations } from 'contexts/useTranslation'
import { Fragment, memo, useMemo } from 'react'
import { useForm } from '../../../contexts/Form'
import Weekdays from './Weekdays'
import FillDates from './FillDates'
import FillColumns from './FillColumns'
import {
  getDaysUntilAuctionEnd,
  getWeekdayNumber,
  getMonth,
  partitionByMonths,
} from './utils'
import * as S from './atoms'

const RangeDatePicker = () => {
  const {
    translations: { common, advertise },
  } = useTranslations()

  const { selectedCharacter, selectedDates, dispatch } = useForm()

  const days = useMemo(
    () => getDaysUntilAuctionEnd(selectedCharacter?.auctionEnd),
    [selectedCharacter],
  )
  const partitionedDates = useMemo(() => partitionByMonths(days), [days])
  const [firstDay] = days

  return (
    <>
      <div className="overflow-hidden rounded-xl shadow-md">
        <p
          aria-label={advertise.RangeDatePicker.currentMonthLabel}
          className="bg-primary text-onPrimary py-3 px-2 text-center text-2xl tracking-wider"
        >
          {common.FullMonth[new Date().getMonth()]}
        </p>

        <div className="bg-surface grid grid-cols-7 gap-1.5 p-3 text-center">
          <Weekdays />

          <FillDates
            firstDay={firstDay}
            amount={getWeekdayNumber(firstDay)}
            step={-1}
          />

          {partitionedDates.map((monthDates, monthIndex) => {
            const monthDatesElements = monthDates.map((date, dayIndex) => {
              const isToday = dayIndex + monthIndex === 0

              return (
                <S.Day
                  key={date}
                  aria-label={date}
                  aria-selected={selectedDates.includes(date)}
                  today={isToday}
                  onClick={() => dispatch({ type: 'TOGGLE_DATE', date })}
                >
                  {new Date(date).getDate()}
                </S.Day>
              )
            })

            const hasNextMonth = monthIndex + 1 < partitionedDates.length
            const currentMonthLastDay = monthDates[monthDates.length - 1]
            const currentMonthLastWeekday =
              getWeekdayNumber(currentMonthLastDay)

            return (
              <Fragment key={`month-${currentMonthLastDay}`}>
                {monthDatesElements}
                {hasNextMonth && (
                  <span
                    aria-label={advertise.RangeDatePicker.nextMonthLabel}
                    className="text-separator col-span-full -mb-1.5 pt-2 pb-1"
                  >
                    {common.FullMonth[(getMonth(monthDates[0]) + 1) % 12]}
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
      </div>

      <p className="-mt-3 text-xs tracking-wide">
        {advertise.RangeDatePicker.smallDescription}
      </p>
    </>
  )
}

export default memo(RangeDatePicker)
