import { useEffect } from 'react'

const ATTRIBUTE = 'modals'

const getScrollbarWidth = () =>
  `${window.innerWidth - document.body.clientWidth}px`

const updateState = (open: boolean) => {
  if (document && document.body) {
    document.body.setAttribute(ATTRIBUTE, open.toString())

    document.body.style.paddingRight = open ? getScrollbarWidth() : 'unset'
    document.body.style.overflow = open ? 'hidden' : 'unset'
  }
}

const useLockBody = (open = true): void => {
  useEffect(() => {
    if (open) updateState(true)

    return (): void => {
      updateState(false)
    }
  }, [open])
}

export default useLockBody
