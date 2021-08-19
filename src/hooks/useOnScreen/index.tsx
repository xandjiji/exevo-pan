import { useState, useEffect } from 'react'

const useOnScreen = <T extends Element>(
  ref: React.MutableRefObject<T | null | undefined>,
  rootMargin = '0px',
): boolean => {
  const [isIntersecting, setIntersecting] = useState(false)
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIntersecting(entry.isIntersecting)
      },
      {
        rootMargin,
      },
    )
    if (ref.current) observer.observe(ref.current)
    return () => {
      if (ref.current) observer.unobserve(ref.current)
    }
  }, [])
  return isIntersecting
}

export default useOnScreen
