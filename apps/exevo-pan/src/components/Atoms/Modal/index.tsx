/* eslint-disable consistent-return */
import { createPortal } from 'react-dom'
import { useIsMounted, useEscToClose } from 'hooks'
import * as S from './styles'
import { ModalProps } from './types'

const Modal = ({
  isOpen,
  onClose,
  children,
  ...props
}: ModalProps): JSX.Element | null => {
  const { elementToFocusRef, onKeyDown } = useEscToClose({
    open: isOpen,
    onClose,
  })

  const isMounted = useIsMounted()

  return isMounted && isOpen
    ? createPortal(
        <S.Wrapper
          tabIndex={0}
          aria-hidden={!isOpen}
          aria-modal="true"
          role="dialog"
          ref={elementToFocusRef}
          onKeyDown={onKeyDown}
          {...props}
        >
          {children}
        </S.Wrapper>,
        document.body,
      )
    : null
}

export default Modal
