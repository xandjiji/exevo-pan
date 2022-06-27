import { useState, useCallback } from 'react'
import { clampValue } from 'utils'
import { isNumber, hasNextValue } from './utils'
import { UseTimeInputProps, ValueState } from './types'

const useTimeInput = ({
  min,
  max,
  onInferredValue,
  onKey,
}: UseTimeInputProps) => {
  const [{ value }, setState] = useState<ValueState>({
    value: '',
    buffer: '',
  })

  const onKeyDown: React.KeyboardEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      onKey?.[e.key]?.()

      if (isNumber(e.key)) {
        setState((prev) => {
          const newValue = prev.buffer + e.key
          const inferValue = !hasNextValue({ min, max, value: newValue })

          if (inferValue) onInferredValue?.()
          return { value: newValue, buffer: inferValue ? '' : newValue }
        })
        return
      }

      if (e.key === 'Backspace') {
        setState({ value: '', buffer: '' })
        return
      }

      if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
        setState((prev) => {
          const modifier = e.key === 'ArrowUp' ? 1 : -1
          const newValue = clampValue(+prev.value + modifier, [
            min,
            max,
          ]).toString()
          return { value: newValue, buffer: '' }
        })
      }
    },
    [min, max, onInferredValue, onKey],
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
