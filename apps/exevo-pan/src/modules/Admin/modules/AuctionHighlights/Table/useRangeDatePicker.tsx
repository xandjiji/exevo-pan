import { useState, useMemo, useCallback } from 'react'
import { ddmmyyy2mmddyyyy, dateToReadableStringDate } from 'utils'

const EMPTY_TOGGLE_DATE = {
  id: '',
  auctionId: 0,
  nickname: '',
  lastUpdated: '',
  joinedReadableDate: '',
  endDate: new Date(),
}

const SEPARATOR = ','
const toggleJoinedDateString = ({
  toggleDate,
  joinedDateString,
}: {
  toggleDate: Date
  joinedDateString: string
}): string => {
  const readableDateSet = new Set(joinedDateString.split(SEPARATOR))
  const toggleDateString = dateToReadableStringDate(toggleDate)

  if (readableDateSet.has(toggleDateString)) {
    readableDateSet.delete(toggleDateString)
  } else {
    readableDateSet.add(toggleDateString)
  }

  return [...readableDateSet].join(SEPARATOR)
}

export const useRangeDatePicker = () => {
  const [toToggleDate, setToToggleDate] = useState(EMPTY_TOGGLE_DATE)
  const [originalDates, setOriginalDates] = useState('')

  const splittedDates = useMemo(
    () => toToggleDate.joinedReadableDate.split(SEPARATOR).filter(Boolean),
    [toToggleDate.joinedReadableDate],
  )

  return {
    toToggleDate,
    setToToggleDate: useCallback((args: typeof EMPTY_TOGGLE_DATE) => {
      setToToggleDate(args)
      setOriginalDates(args.joinedReadableDate)
    }, []),
    startDate: useMemo(
      () =>
        toToggleDate.lastUpdated
          ? new Date(toToggleDate.lastUpdated)
          : new Date(),
      [toToggleDate.lastUpdated],
    ),
    endDate: toToggleDate.endDate,
    selectedDates: useMemo(
      () =>
        splittedDates.map(
          (stringDate) => new Date(ddmmyyy2mmddyyyy(stringDate)),
        ),
      [splittedDates],
    ),
    onDateSelect: (toggleDate: Date) =>
      setToToggleDate((prev) => ({
        ...prev,
        joinedReadableDate: toggleJoinedDateString({
          toggleDate,
          joinedDateString: toToggleDate.joinedReadableDate,
        }),
      })),
    resetDates: useCallback(() => {
      setToToggleDate({ ...EMPTY_TOGGLE_DATE })
      setOriginalDates('')
    }, []),
    dateDiff: useMemo(() => {
      const originalSet = new Set(originalDates.split(SEPARATOR))
      const changeSet = new Set(splittedDates)

      const added = [...changeSet].filter(
        (currentChange) => !originalSet.has(currentChange),
      )
      const removed = [...originalSet].filter(
        (original) => !changeSet.has(original),
      )

      return { added, removed, noChange: added.length + removed.length === 0 }
    }, [splittedDates, originalDates]),
  }
}
