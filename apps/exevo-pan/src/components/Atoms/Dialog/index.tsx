/* eslint-disable consistent-return */
import { createPortal } from 'react-dom'
import FocusLock from 'react-focus-lock'
import { useEscToClose, useLockBody } from 'hooks'
import * as S from './styles'
import { DialogProps } from './types'

const Modal = ({
  isOpen,
  onClose,
  children,
  ...props
}: DialogProps): JSX.Element | null => {
  const { elementToFocusRef, onKeyDown } = useEscToClose({
    open: isOpen,
    onClose,
  })

  useLockBody(isOpen)

  return isOpen
    ? createPortal(
        <FocusLock>
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
              {/* @ ToDo: i18n aria label */}
              <S.CloseButton type="button" onClick={onClose}>
                <S.CloseIcon />
              </S.CloseButton>
              {children}
            </S.Wrapper>
          </S.Backdrop>
        </FocusLock>,
        document.body,
      )
    : null
}

export default Modal
