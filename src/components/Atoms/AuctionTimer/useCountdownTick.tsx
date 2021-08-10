import { useState, useCallback, useEffect } from 'react'
import { calcCountdown } from './utils'
import { CountdownObject } from './types'

const useCountdownTick = (initialValue: number): CountdownObject => {
  const getCurrentTick = useCallback(
    () => calcCountdown(+new Date(), initialValue),
    [initialValue],
  )

  const [countdown, setCountdown] = useState<CountdownObject>(getCurrentTick)

  useEffect(() => {
    const timeout = setInterval(() => setCountdown(getCurrentTick), 1000)
    return () => clearInterval(timeout)
  }, [getCurrentTick])

  return countdown
}

export default useCountdownTick
