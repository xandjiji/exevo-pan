import { useState, useCallback, useEffect } from 'react'
import { calcTimeDiff } from './utils'
import { TimeDiffObject } from './types'

const useCountdownTick = (initialValue: number): TimeDiffObject => {
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

export default useCountdownTick
