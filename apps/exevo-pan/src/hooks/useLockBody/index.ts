import { useEffect } from 'react'

const getScrollbarWidth = () =>
  `${window.innerWidth - document.body.clientWidth}px`

const useLockBody = (open = true): void => {
  useEffect(() => {
    if (document && document.body) {
      document.body.style.paddingRight = open ? getScrollbarWidth() : 'unset'
      document.body.style.overflow = open ? 'hidden' : 'unset'
    }

    return (): void => {
      document.body.style.overflow = 'unset'
      document.body.style.paddingRight = 'unset'
    }
  }, [open])
}

export default useLockBody
