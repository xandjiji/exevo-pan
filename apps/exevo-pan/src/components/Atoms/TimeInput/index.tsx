import { useRef, useCallback } from 'react'
import useTimeInput from './useTimeInput'
import { TimeInputProps } from './types'

/* @ ToDo:
- style

- arrow left/right
- arrow inc/dec
- arrow inc/dec cycle

- prop pad 0
- '--' fallback

- hidden input
- controllable
*/

const TimeInput = ({ maxHour = 23, minHour = 0 }: TimeInputProps) => {
  const hoursRef = useRef<HTMLInputElement>(null)
  const minutesRef = useRef<HTMLInputElement>(null)

  const [hour, hourBinders] = useTimeInput({
    min: minHour,
    max: maxHour,
    onFinish: useCallback(() => minutesRef.current?.focus(), []),
  })

  const [minute, minuteBinders] = useTimeInput({
    min: 0,
    max: 59,
    onFinish: useCallback(() => minutesRef.current?.blur(), []),
  })

  const maxLength = maxHour.toString().length

  const hoursValue = hour ? hour.padStart(maxLength, '0') : '--'
  const minutesValue = minute ? minute.padStart(maxLength, '0') : '--'

  return (
    <div>
      <input
        {...hourBinders}
        ref={hoursRef}
        value={hoursValue}
        className="focus:bg-primaryVariant caret-transparent transition-colors selection:bg-transparent"
      />

      <input
        {...minuteBinders}
        ref={minutesRef}
        value={minutesValue}
        className="focus:bg-primaryVariant caret-transparent transition-colors selection:bg-transparent"
      />
    </div>
  )
}

export default TimeInput
