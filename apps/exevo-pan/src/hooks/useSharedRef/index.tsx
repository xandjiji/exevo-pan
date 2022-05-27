/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable no-param-reassign */
import { useEffect, useRef, RefObject, Ref } from 'react'

const useShareForwardedRef = <T,>(ref: Ref<T>): RefObject<T> => {
  const innerRef = useRef<T>(null)

  useEffect(() => {
    if (!ref) return

    if (typeof ref === 'function') {
      ref(innerRef.current)
    } else {
      // @ts-ignore
      ref.current = innerRef.current
    }
  }, [ref, innerRef])

  return innerRef
}

export default useShareForwardedRef
