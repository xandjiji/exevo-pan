import { useEffect } from 'react'

const useLockBody = (open = true): void => {
  useEffect(() => {
    if (document && document.body) {
      document.body.style.overflow = open ? 'hidden' : 'unset'
    }

    return (): void => {
      document.body.style.overflow = 'unset'
    }
  }, [open])
}

export default useLockBody
