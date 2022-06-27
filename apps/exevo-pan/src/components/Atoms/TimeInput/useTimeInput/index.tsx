import { useState, useCallback } from 'react'
import { clampValue } from 'utils'
import { isNumber, hasNextValue } from './utils'
import { UseTimeInputProps, ValueState } from './types'

const useTimeInput = ({ min, max, onInferredValue }: UseTimeInputProps) => {
  const [{ value }, setState] = useState<ValueState>({
    value: '',
    buffer: '',
  })

  const onKeyDown: React.KeyboardEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      if (isNumber(e.key)) {
        setState((prev) => {
          const newValue = prev.buffer + e.key

          if (!hasNextValue({ min, max, value: newValue })) onInferredValue()
          return { value: newValue, buffer: newValue }
        })
        return
      }

      switch (e.key) {
        case 'Backspace':
          setState({ value: '', buffer: '' })
          break

        case 'ArrowUp':
        case 'ArrowDown':
          setState((prev) => {
            const modifier = e.key === 'ArrowUp' ? 1 : -1
            const newValue = clampValue(+prev.value + modifier, [
              min,
              max,
            ]).toString()
            return { value: newValue, buffer: newValue }
          })
          break

        default:
      }
    },
    [min, max, onInferredValue],
  )

  /*  This is necessary because we are trying to control an input with Preact */
  const onChange: React.ChangeEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      e.target.value = value
    },
    [value],
  )

  const onBlur = useCallback(
    () => setState((prev) => ({ ...prev, buffer: '' })),
    [value],
  )

  return [
    value,
    {
      onKeyDown,
      onChange,
      onBlur,
    },
  ] as const
}

export default useTimeInput
