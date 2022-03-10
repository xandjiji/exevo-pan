/* eslint-disable consistent-return */
import { createPortal } from 'react-dom'
import { useEscToClose, useLockBody } from 'hooks'
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

  useLockBody(isOpen)

  return isOpen
    ? createPortal(
        <>
          <S.Backdrop aria-hidden={!isOpen} onClick={onClose}>
            <S.Wrapper
              tabIndex={0}
              aria-hidden={!isOpen}
              aria-modal="true"
              role="dialog"
              ref={elementToFocusRef}
              onKeyDown={onKeyDown}
              onClick={(event) => event.stopPropagation()}
              {...props}
            >
              {children}
            </S.Wrapper>
          </S.Backdrop>
        </>,
        document.body,
      )
    : null
}

export default Modal
