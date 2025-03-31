/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
import { createPortal } from 'react-dom'
import { useEffect, useRef, useState } from 'react'
import clsx from 'clsx'
import FocusLock from 'react-focus-lock'
import { useDrag, useEscToClose, useIsMounted, useLockBody } from 'hooks'
import DrawerHead from './DrawerHead'
import DrawerFooter from './DrawerFooter'
import DrawerBody from './DrawerBody'
import { DrawerProps } from './types'

const Drawer = ({
  isOpen,
  onClose,
  children,
  className,
  ...props
}: DrawerProps) => {
  const initialDrag = useRef<number | null>(null)
  const [drawerOffset, setDrawerOffset] = useState<number>(0)
  const [shouldBeRendered, setShouldBeRendered] = useState<boolean>(isOpen)

  useLockBody(isOpen)

  const { elementToFocusRef, onKeyDown } = useEscToClose({
    open: isOpen,
    onClose,
  })

  const { binders, isMousePressed, position } = useDrag()

  useEffect(() => {
    if (!initialDrag.current && isMousePressed) {
      initialDrag.current = position.x
    } else if (initialDrag.current && !isMousePressed) {
      initialDrag.current = null
      onClose()
      setTimeout(() => setDrawerOffset(0), 200)
    }
  }, [isMousePressed, onClose, position.x])

  useEffect(() => {
    if (initialDrag.current) {
      const offset = position.x - initialDrag.current
      if (offset < 0) {
        setDrawerOffset(position.x - initialDrag.current)
      } else {
        setDrawerOffset(0)
      }
    }
  }, [position.x, initialDrag])

  const isMounted = useIsMounted()

  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => setShouldBeRendered(false), 200)
    } else {
      setShouldBeRendered(true)
    }
  }, [isOpen])

  return isMounted && shouldBeRendered
    ? createPortal(
        <FocusLock>
          <div
            tabIndex={0}
            aria-hidden={!isOpen}
            aria-modal="true"
            role="dialog"
            ref={elementToFocusRef}
            onKeyDown={onKeyDown}
            className={clsx(
              'animate-slideIn z-75 bg-surface fixed top-0 left-0 flex h-screen w-[90vw] max-w-[620px] flex-col shadow-lg outline-none',
              !isOpen && 'invisible opacity-0',
              className,
            )}
            style={{
              marginLeft: `${drawerOffset}px`,
              transform: `translateX(${isOpen ? '0' : '-100%'})`,
              transition: '0.2s ease-out',
              transitionProperty: 'opacity, transform, visibility',
            }}
            {...props}
          >
            {children}
          </div>

          <div
            className={clsx(
              'z-74 animate-fadeIn bg-backdrop fixed top-0 left-0 h-screen w-screen transition-all',
              !isOpen && 'pointer-events-none opacity-0',
            )}
            style={{ cursor: isMousePressed ? 'grabbing' : 'unset' }}
            aria-hidden={!isOpen}
            {...binders}
          />
        </FocusLock>,
        document.body,
      )
    : null
}

Drawer.Head = DrawerHead
Drawer.Body = DrawerBody
Drawer.Footer = DrawerFooter

export default Drawer
