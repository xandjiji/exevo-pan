import { useState, useRef } from 'react'
import { isNumber, hasNextValue } from './utils'
import { TimeInputProps } from './types'

/* @ ToDo:
- arrow left/right tab
- arrow inc/dec
- arrow inc/dec cycle
- max/min
- seconds?
- focus next field

- prop pad 0

- hidden input
- controllable
*/

const TimeInput = ({ maxHour = 23, minHour = 0 }: TimeInputProps) => {
  const [hours, setHours] = useState('')
  const [hourBuffer, setHourBuffer] = useState('')
  const [minutes, setMinutes] = useState('')

  const hoursRef = useRef<HTMLInputElement>(null)
  const minutesRef = useRef<HTMLInputElement>(null)

  const tabNext = () => minutesRef.current?.focus()

  const maxLength = maxHour.toString().length

  const onKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (isNumber(e.key)) {
      const bufferValue = hourBuffer + e.key
      setHourBuffer(bufferValue)
      setHours(bufferValue)
      if (!hasNextValue({ min: minHour, max: maxHour, buffer: bufferValue })) {
        tabNext()
      }
    }
  }

  const hoursValue = hours ? hours.padStart(maxLength, '0') : '--'
  const minutesValue = minutes ? minutes.padStart(maxLength, '0') : '--'

  return (
    <div>
      <input
        ref={hoursRef}
        value={hoursValue}
        onKeyDown={onKeyDown}
        onChange={(e) => {
          e.target.value = hoursValue
        }}
        onBlur={() => setHourBuffer('')}
        className="focus:bg-primaryVariant caret-transparent transition-colors selection:bg-transparent"
      />

      <input
        ref={minutesRef}
        value={minutesValue}
        className="focus:bg-primaryVariant caret-transparent transition-colors selection:bg-transparent"
        onChange={(e) => {
          e.target.value = minutesValue
        }}
      />
    </div>
  )
}

export default TimeInput
