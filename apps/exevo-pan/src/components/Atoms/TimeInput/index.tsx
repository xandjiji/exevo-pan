import { forwardRef, useRef, useCallback, useMemo } from 'react'
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

const Input = forwardRef<HTMLInputElement, JSX.IntrinsicElements['input']>(
  (args, ref) => (
    <input
      ref={ref}
      {...args}
      className="focus:bg-primaryVariant text-onSurface text-tsm border-none bg-transparent text-center caret-transparent outline-none transition-colors selection:bg-transparent"
      style={{ width: '3ch' }}
    />
  ),
)

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
      <div className="border-1 bg-surface border-separator focus-within:border-primary text-tsm child:shrink-0 flex w-fit cursor-text items-center gap-[1px] rounded-md border-solid py-[9px] px-3 transition-colors">
        <Input ref={hoursRef} {...hourBinders} />
        :
        <Input ref={minutesRef} {...minuteBinders} />
      </div>
    </div>
  )
}

export default TimeInput
