import { useState, useCallback, useMemo, useEffect } from 'react'
import { clampValue as baseClampValue } from 'utils'
import { formatValue, EMPTY_VALUE } from '../utils'
import { isNumber, canInferValue, preventPropagation } from './utils'
import { UseTimeInputProps } from './types'

const useTimeInput = ({
  defaultValue,
  controlledValue,
  min,
  max,
  onDoubleBackspace,
  onInferredValue,
  onKey,
}: UseTimeInputProps) => {
  const [state, setState] = useState({
    value: defaultValue,
    nextValue: defaultValue,
    buffer: '',
  })

  const isControlled = controlledValue !== undefined

  useEffect(() => {
    if (controlledValue !== undefined) {
      setState((current) => ({ ...current, value: controlledValue }))
    }
  }, [controlledValue])

  const maxLength = useMemo(() => max.toString().length, [max])
  const shownValue = useMemo(
    () => formatValue(controlledValue ?? state.value, maxLength),
    [maxLength, controlledValue, state.value],
  )

  const clampValue = useCallback(
    (newValue: string | number): string =>
      baseClampValue(+newValue, [min, max]).toString(),
    [min, max],
  )

  const onKeyDown: React.KeyboardEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      onKey?.[e.key]?.()

      if (e.key === 'Backspace') {
        setState((currentState) => {
          if (currentState.value === '' || currentState.value === EMPTY_VALUE) {
            onDoubleBackspace?.()
          }
          const nextValue = ''

          return {
            nextValue,
            value: isControlled ? currentState.value : nextValue,
            buffer: '',
          }
        })
      }

      if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
        setState((currentState) => {
          const modifier = e.key === 'ArrowUp' ? 1 : -1
          const nextValue = clampValue(+currentState.value + modifier)

          return {
            nextValue,
            value: isControlled ? currentState.value : nextValue,
            buffer: '',
          }
        })
      }
    },
    [isControlled, min, max, onDoubleBackspace, onKey],
  )

  const onChange: React.ChangeEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      const { data }: { data?: string } = e as any

      if (data && isNumber(data)) {
        setState((currentState) => {
          const nextValue = clampValue(currentState.buffer + data)
          const inferValue = canInferValue({ min, max, buffer: nextValue })

          if (inferValue) onInferredValue?.()
          return {
            nextValue,
            value: isControlled ? currentState.value : nextValue,
            buffer: inferValue ? '' : nextValue,
          }
        })
      }

      /*  This is necessary because we are trying to control an input with Preact */
      e.target.value = shownValue
    },
    [min, max, onInferredValue, isControlled, shownValue],
  )

  const onBlur = useCallback(
    () => setState((prev) => ({ ...prev, buffer: '' })),
    [],
  )

  return {
    value: shownValue,
    nextValue: state.nextValue,
    onKeyDown,
    onChange,
    onBlur,
    onClick: preventPropagation,
  }
}

export default useTimeInput
