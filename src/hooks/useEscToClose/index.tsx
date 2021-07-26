import React, { useEffect, useRef } from 'react'
import { UseEscapeToCloseProps, UseEscapeToCloseObject } from './types'

export const useEscapeToClose = ({
  open,
  onClose,
}: UseEscapeToCloseProps): UseEscapeToCloseObject => {
  const elementToFocusRef = useRef<HTMLDivElement>(null)
  const previousFocusedElement = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (open) {
      previousFocusedElement.current = document.activeElement as HTMLElement

      elementToFocusRef.current?.focus()
    } else {
      previousFocusedElement.current?.focus()
    }
  }, [open])

  const onKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Escape') {
      onClose?.()
    }
  }

  return {
    elementToFocusRef,
    onKeyDown,
  }
}

export default useEscapeToClose
