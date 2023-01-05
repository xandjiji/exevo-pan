import { useState, useCallback, useId } from 'react'
import { Dialog } from 'components/Atoms'

const useHeaderPopup = <T extends Element>(
  ref: React.MutableRefObject<T | null | undefined>,
) => {
  const [isOpen, setIsOpen] = useState(false)

  const getPostion = useCallback(() => {
    if (!ref.current) return { top: 0, left: 0 }
    const { bottom, right } = ref.current?.getBoundingClientRect() as DOMRect
    return { top: bottom + 8, right: `calc(100% - ${right}px)` }
  }, [])

  const open = useCallback(() => setIsOpen(true), [])
  const close = useCallback(() => setIsOpen(false), [])

  const toggleId = useId()
  const dialogId = useId()

  return {
    buttonBinders: {
      id: toggleId,
      'aria-expanded': isOpen,
      'aria-haspopup': true,
      'aria-controls': isOpen ? dialogId : undefined,
    },
    action: { open, close },
    Popup: ({ children }: { children: React.ReactNode }) => (
      <Dialog
        id={dialogId}
        role="menu"
        aria-labelledby={toggleId}
        isOpen={isOpen}
        onClose={close}
        style={{
          padding: 0,
          position: 'absolute',
          ...getPostion(),
        }}
        className="border-1 border-separator/50 overflow-hidden border-solid"
        noCloseButton
      >
        {children}
      </Dialog>
    ),
  }
}

export default useHeaderPopup
