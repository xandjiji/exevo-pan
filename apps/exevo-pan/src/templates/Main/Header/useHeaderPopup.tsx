import { useState, useCallback } from 'react'
import { Dialog } from 'components/Atoms'

const useHeaderPopup = <T extends Element>(
  ref: React.MutableRefObject<T | null | undefined>,
) => {
  const [isOpen, setIsOpen] = useState(false)

  const getPostion = useCallback(() => {
    if (!ref.current) return { top: 0, left: 0 }
    const { bottom, right } = ref.current?.getBoundingClientRect()
    return { top: bottom + 8, right: `calc(100% - ${right}px)` }
  }, [])

  const openAction = useCallback(() => setIsOpen(true), [])
  const closeAction = useCallback(() => setIsOpen(false), [])

  return {
    openAction,
    closeAction,
    Popup: ({ children }: { children: React.ReactNode }) => (
      <Dialog
        isOpen={isOpen}
        onClose={closeAction}
        style={{
          position: 'absolute',
          ...getPostion(),
        }}
        noCloseButton
      >
        {children}
      </Dialog>
    ),
  }
}

export default useHeaderPopup
