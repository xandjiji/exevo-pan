import { useState, useEffect, useRef } from 'react'
import useDrag from 'hooks/useDrag'
import useEscToClose from 'hooks/useEscToClose'
import DrawerHead from './DrawerHead'
import DrawerFooter from './DrawerFooter'
import * as S from './styles'
import { DrawerProps } from './types'

const Drawer = ({
  isOpen,
  onClose,
  children,
  ...props
}: DrawerProps): JSX.Element => {
  const initialDrag = useRef<number | null>(null)
  const [drawerOffset, setDrawerOffset] = useState<number>(0)

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

  return (
    <>
      <S.Wrapper
        tabIndex={0}
        aria-hidden={!isOpen}
        aria-modal="true"
        role="dialog"
        ref={elementToFocusRef}
        isOpen={isOpen}
        onKeyDown={onKeyDown}
        style={{ marginLeft: `${drawerOffset}px` }}
        {...props}
      >
        {children}
      </S.Wrapper>
      <S.Backdrop
        isOpen={isOpen}
        style={{ cursor: isMousePressed ? 'grabbing' : 'unset' }}
        {...binders}
      />
    </>
  )
}

Drawer.Head = DrawerHead
Drawer.Body = S.DrawerBody
Drawer.Footer = DrawerFooter

export default Drawer
