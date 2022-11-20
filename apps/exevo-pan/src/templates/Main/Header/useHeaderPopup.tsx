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

  const open = useCallback(() => setIsOpen(true), [])
  const close = useCallback(() => setIsOpen(false), [])

  return {
    action: { open, close },
    Popup: ({ children }: { children: React.ReactNode }) => (
      <Dialog
        isOpen={isOpen}
        onClose={close}
        style={{
          padding: 0,
          position: 'absolute',
          ...getPostion(),
        }}
        className="overflow-hidden"
        noCloseButton
      >
        {children}
      </Dialog>
    ),
  }
}

export default useHeaderPopup
