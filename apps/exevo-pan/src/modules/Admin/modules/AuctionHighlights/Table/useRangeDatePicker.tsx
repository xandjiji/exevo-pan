import { useState, useMemo, useCallback } from 'react'
import { ddmmyyy2mmddyyyy } from 'utils'
import { SEPARATOR, toggleJoinedDateString, forwardOneMonth } from './utils'

const EMPTY_TOGGLE_DATE = {
  id: '',
  auctionId: 0,
  nickname: '',
  lastUpdated: '',
  joinedReadableDate: '',
}

export const useRangeDatePicker = () => {
  const [endDate] = useState(() => forwardOneMonth())
  const [toToggleDate, setToToggleDate] = useState(EMPTY_TOGGLE_DATE)

  return {
    toToggleDate,
    setToToggleDate,
    endDate,
    selectedDates: useMemo(
      () =>
        toToggleDate.joinedReadableDate
          .split(SEPARATOR)
          .map((stringDate) => new Date(ddmmyyy2mmddyyyy(stringDate))),
      [toToggleDate],
    ),
    onDateSelect: (toggleDate: Date) =>
      setToToggleDate((prev) => ({
        ...prev,
        joinedReadableDate: toggleJoinedDateString({
          toggleDate,
          joinedDateString: toToggleDate.joinedReadableDate,
        }),
      })),
    resetDates: useCallback(
      () => setToToggleDate({ ...EMPTY_TOGGLE_DATE }),
      [],
    ),
  }
}
