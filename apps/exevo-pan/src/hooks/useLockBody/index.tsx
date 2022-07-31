import {
  createContext,
  useContext,
  useCallback,
  useEffect,
  useState,
  useRef,
} from 'react'
import { v4 as uuidv4 } from 'uuid'
import { LockBodyProviderProps, Updater } from './types'

const LockBodyContext = createContext<Updater>(() => {})

const getScrollbarWidth = () =>
  `${window.innerWidth - document.body.clientWidth}px`

export const LockBodyProvider = ({ children }: LockBodyProviderProps) => {
  const [modals, setModals] = useState<Record<string, boolean>>({})

  const isOpen = Object.values(modals).some((state) => state)

  useEffect(() => {
    if (document && document.body) {
      document.body.style.paddingRight = isOpen ? getScrollbarWidth() : 'unset'
      document.body.style.overflow = isOpen ? 'hidden' : 'unset'
    }
  }, [isOpen])

  const updateModal = useCallback(
    (key: string, status: boolean) =>
      setModals((prev) => ({
        ...prev,
        [key]: status,
      })),
    [],
  )

  return (
    <LockBodyContext.Provider value={updateModal}>
      {children}
    </LockBodyContext.Provider>
  )
}

const useLockBody = (open = true): void => {
  const updateModal = useContext(LockBodyContext)

  const key = useRef(uuidv4())

  useEffect(() => {
    updateModal(key.current, open)

    return () => {
      updateModal(key.current, false)
    }
  }, [open])
}

export default useLockBody
