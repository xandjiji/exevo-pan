import { useState, useEffect } from 'react'
import { throttle } from 'utils'

const THROTTLE_DELAY = 300

const useIsDesktop = (initialState = false): boolean => {
  const [isDesktop, setIsDesktop] = useState(initialState)

  useEffect(() => {
    const updateMediaQuery = throttle(() => {
      setIsDesktop(window.matchMedia('(min-width: 768px)').matches)
    }, THROTTLE_DELAY)

    updateMediaQuery()
    window.addEventListener('resize', updateMediaQuery)

    return () => window.removeEventListener('resize', updateMediaQuery)
  }, [])

  return isDesktop
}

export default useIsDesktop
