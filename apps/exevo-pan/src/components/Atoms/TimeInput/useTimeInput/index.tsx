import { useState, useCallback, useMemo } from 'react'
import { clampValue as baseClampValue } from 'utils'
import { isNumber, canInferValue, formatValue } from './utils'
import { UseTimeInputProps } from './types'

const useTimeInput = ({
  min,
  max,
  onInferredValue,
  onKey,
}: UseTimeInputProps) => {
  const [{ value }, setState] = useState({
    value: '',
    buffer: '',
  })

  const formattedValue = useMemo(() => formatValue(value, max), [max, value])

  const clampValue = useCallback(
    (newValue: string | number): string =>
      baseClampValue(+newValue, [min, max]).toString(),
    [min, max],
  )

  const onKeyDown: React.KeyboardEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      onKey?.[e.key]?.()

      if (isNumber(e.key)) {
        setState((prev) => {
          const newValue = clampValue(prev.buffer + e.key)
          const inferValue = canInferValue({ min, max, buffer: newValue })

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
          const newValue = clampValue(+prev.value + modifier)
          return { value: newValue, buffer: '' }
        })
      }
    },
    [min, max, onInferredValue, onKey],
  )

  /*  This is necessary because we are trying to control an input with Preact */
  const onChange: React.ChangeEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      e.target.value = formattedValue
    },
    [formattedValue],
  )

  const onBlur = useCallback(
    () => setState((prev) => ({ ...prev, buffer: '' })),
    [],
  )

  return {
    value: formattedValue,
    onKeyDown,
    onChange,
    onBlur,
  }
}

export default useTimeInput
