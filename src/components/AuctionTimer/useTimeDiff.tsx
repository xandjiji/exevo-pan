import { useState, useCallback, useEffect } from 'react'
import { TimeDiffObject } from './types'

const MILLISECONDS_IN_A_MINUTE = 60000
const MILLISECONDS_IN_AN_HOUR = 3600000
const MILLISECONDS_IN_A_DAY = 86400000

const calcTimeDiff = (startTime: number, endTime: number): TimeDiffObject => {
  const timeDiff = endTime - startTime

  const days = Math.floor(timeDiff / MILLISECONDS_IN_A_DAY)
  const hours = Math.floor(
    (timeDiff % MILLISECONDS_IN_A_DAY) / MILLISECONDS_IN_AN_HOUR,
  )
  const minutes = Math.floor(
    (timeDiff % MILLISECONDS_IN_AN_HOUR) / MILLISECONDS_IN_A_MINUTE,
  )
  const seconds = Math.floor((timeDiff % MILLISECONDS_IN_A_MINUTE) / 1000)

  return { timeDiff, days, hours, minutes, seconds }
}

const useTimeDiff = (initialValue: number): TimeDiffObject => {
  const getTimeDiff = useCallback(
    () => calcTimeDiff(+new Date(), initialValue),
    [initialValue],
  )

  const [timeDiff, setTimeDiff] = useState<TimeDiffObject>(getTimeDiff)

  useEffect(() => {
    const timeout = setInterval(() => setTimeDiff(getTimeDiff()), 1000)
    return () => clearInterval(timeout)
  }, [getTimeDiff])

  return timeDiff
}

export default useTimeDiff
