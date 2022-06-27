import { useRef, useCallback, useMemo } from 'react'
import useTimeInput from './useTimeInput'
import { TimeInputProps } from './types'

/* @ ToDo:
- style
    label
    disabled
    invalid

- hidden input
- controllable

- ally
    label click event
    numeric keyboard
    enter key hint?
*/

const TimeInput = ({ min = 0, max = 23 }: TimeInputProps) => {
  const hoursRef = useRef<HTMLInputElement>(null)
  const minutesRef = useRef<HTMLInputElement>(null)

  const hourBinders = useTimeInput({
    min,
    max,
    onInferredValue: useCallback(() => minutesRef.current?.focus(), []),
    onKey: useMemo(
      () => ({
        ArrowRight: () => minutesRef.current?.focus(),
      }),
      [],
    ),
  })

  const minuteBinders = useTimeInput({
    min: 0,
    max: 59,
    onKey: useMemo(
      () => ({
        ArrowLeft: () => hoursRef.current?.focus(),
      }),
      [],
    ),
  })

  return (
    <div>
      <input
        ref={hoursRef}
        className="focus:bg-primaryVariant caret-transparent transition-colors selection:bg-transparent"
        {...hourBinders}
      />

      <input
        ref={minutesRef}
        className="focus:bg-primaryVariant caret-transparent transition-colors selection:bg-transparent"
        {...minuteBinders}
      />
    </div>
  )
}

export default TimeInput
