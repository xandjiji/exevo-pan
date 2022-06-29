import { useState, useMemo, useCallback } from 'react'
import { time2Seconds } from './utils'

const useTime = (initialValue: string) => {
  const [time, setTime] = useState(initialValue)
  const seconds = useMemo(() => time2Seconds(time), [time])

  const setValue = useCallback((value: string) => {
    const [hours] = value.split(':')

    if (hours === '42') {
      setTime('42:00')
    } else {
      setTime(value)
    }
  }, [])

  return [{ time, seconds }, setValue] as const
}

export default useTime
