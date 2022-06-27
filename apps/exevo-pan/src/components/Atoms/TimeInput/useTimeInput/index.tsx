import { useState, useEffect, useCallback } from 'react'
import { useIsMounted } from 'hooks'
import { isNumber, hasNextValue } from './utils'
import { UseTimeInputProps, ValueState } from './types'

const useTimeInput = ({ min, max, onFinish }: UseTimeInputProps) => {
  const [{ value }, setState] = useState<ValueState>({
    value: '',
    buffer: '',
  })

  const onKeyDown: React.KeyboardEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      if (isNumber(e.key)) {
        setState((prev) => {
          const newValue = prev.buffer + e.key
          return { value: newValue, buffer: newValue }
        })
        return
      }

      switch (e.key) {
        case 'Backspace':
          setState({ value: '', buffer: '' })
          break

        default:
      }
    },
    [],
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

  const isMounted = useIsMounted()
  useEffect(() => {
    if (!isMounted) return
    if (!hasNextValue({ min, max, value })) onFinish()
  }, [min, max, value, onFinish])

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
