import { useState, useRef } from 'react'
import { rightMostDigit, isNumber } from './utils'
import { TimeInputProps } from './types'

/* @ ToDo:
- preserve focus/select
- number only
- infer value on typing (based max/min)

- arrow left/right tab
- arrow inc/dec
- arrow inc/dec cycle
- max/min
- seconds?
- focus next field

- hidden input
- controllable

max: 23
    -3
max: 20
    -3

max: 233

max: 230

max: 200

*/

const TimeInput = ({ maxHour = 23 }: TimeInputProps) => {
  const [hours, setHours] = useState('')
  const [hourBuffer, setHourBuffer] = useState('')
  const [minutes, setMinutes] = useState('')

  const hoursRef = useRef<HTMLInputElement>(null)
  const minutesRef = useRef<HTMLInputElement>(null)

  const tabNext = () => minutesRef.current?.focus()

  const maxHourDigit = +maxHour.toString()[0]
  const maxLength = maxHour.toString().length
  const onKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (isNumber(e.key)) {
      const inputNumber = +e.key
      if (hourBuffer.length < maxLength) {
        const bufferValue = hourBuffer + e.key
        setHourBuffer(bufferValue)
        setHours(bufferValue.padStart(maxLength, '0'))
      }
      /* do something */
    }
  }

  console.log(hourBuffer)

  const hoursValue = hours || '--'
  const minutesValue = minutes || '--'

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
        className="focus:bg-primaryVariant caret-transparent transition-colors"
      />

      <input
        ref={minutesRef}
        value={minutesValue}
        className="focus:bg-primaryVariant caret-transparent transition-colors"
        onChange={(e) => console.log(e.target.value)}
      />
    </div>
  )
}

export default TimeInput
