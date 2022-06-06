import { useRef } from 'react'
import { Value } from './types'

const useValueRef = (value: Value) => {
  const valueRef = useRef(value)
  valueRef.current = value

  return valueRef
}

export default useValueRef
