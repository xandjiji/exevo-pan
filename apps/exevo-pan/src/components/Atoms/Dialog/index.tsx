/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import { useTranslations } from 'contexts/useTranslation'
import { createPortal } from 'react-dom'
import clsx from 'clsx'
import FocusLock from 'react-focus-lock'
import { useEscToClose, useLockBody } from 'hooks'
import { CrossIcon } from 'assets/svgs'
import { DialogProps } from './types'

const Dialog = ({
  className,
  heading,
  isOpen,
  onClose,
  noCloseButton = false,
  children,
  ...props
}: DialogProps) => {
  const {
    translations: { common },
  } = useTranslations()

  const { elementToFocusRef, onKeyDown } = useEscToClose({
    open: isOpen,
    onClose,
  })

  useLockBody(isOpen)

  return isOpen
    ? createPortal(
        <FocusLock>
          <div className="z-dialog animate-fadeIn bg-backdrop fixed top-0 left-0 flex h-full w-full items-center justify-center text-left">
            <button
              className="-z-1 absolute top-0 left-0 h-full w-full"
              type="button"
              aria-hidden={!isOpen}
              onClick={onClose}
              aria-label={common.Dialog.close}
            />
            <div
              tabIndex={0}
              aria-hidden={!isOpen}
              aria-modal="true"
              role="dialog"
              ref={elementToFocusRef}
              onKeyDown={onKeyDown}
              onClick={(event) => event.stopPropagation()}
              className={clsx('card animate-rushIn px-6 py-4', className)}
              {...props}
            >
              <div
                className={clsx(
                  'flex items-center justify-between gap-2',
                  heading && 'mb-4 w-full',
                  !heading && !noCloseButton && 'float-right',
                )}
              >
                {heading && (
                  <h5 className="text-onSurface text-2xl transition-colors">
                    {heading}
                  </h5>
                )}
                {!noCloseButton && (
                  <button
                    className="clickable ml-auto grid w-fit place-items-center rounded"
                    type="button"
                    aria-label={common.Dialog.close}
                    onClick={onClose}
                  >
                    <CrossIcon className="fill-onSurface" />
                  </button>
                )}
              </div>
              {children}
            </div>
          </div>
        </FocusLock>,
        document.body,
      )
    : null
}

export default Dialog
