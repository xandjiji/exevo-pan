import { createPortal } from 'react-dom'
import { useState, useEffect, useRef } from 'react'
import { useDrag, useEscToClose, useIsMounted } from 'hooks'
import DrawerHead from './DrawerHead'
import DrawerFooter from './DrawerFooter'
import * as S from './styles'
import { DrawerProps } from './types'

const Drawer = ({
  isOpen,
  onClose,
  children,
  ...props
}: DrawerProps): JSX.Element | null => {
  const initialDrag = useRef<number | null>(null)
  const [drawerOffset, setDrawerOffset] = useState<number>(0)
  const [shouldBeRendered, setShouldBeRendered] = useState<boolean>(isOpen)

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
        <>
          <S.Wrapper
            tabIndex={0}
            aria-hidden={!isOpen}
            aria-modal="true"
            role="dialog"
            ref={elementToFocusRef}
            onKeyDown={onKeyDown}
            style={{ marginLeft: `${drawerOffset}px` }}
            {...props}
          >
            {children}
          </S.Wrapper>
          <S.Backdrop
            aria-hidden={!isOpen}
            style={{ cursor: isMousePressed ? 'grabbing' : 'unset' }}
            {...binders}
          />
        </>,
        document.body,
      )
    : null
}

Drawer.Head = DrawerHead
Drawer.Body = S.DrawerBody
Drawer.Footer = DrawerFooter

export default Drawer
