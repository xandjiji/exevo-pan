import { useEffect, useRef } from 'react'

const useIsMounted = (): boolean => {
  const isMounted = useRef<boolean>(false)

  useEffect(() => {
    isMounted.current = true
    return () => {
      isMounted.current = false
    }
  }, [])

  return isMounted.current
}

export default useIsMounted
