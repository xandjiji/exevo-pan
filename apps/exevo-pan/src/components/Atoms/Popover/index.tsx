import { useTranslations } from 'contexts/useTranslation'
import {
  useState,
  useMemo,
  Children,
  isValidElement,
  cloneElement,
} from 'react'
import clsx from 'clsx'
import { usePopper } from 'react-popper'
import { Modifier } from '@popperjs/core'
import { checkKeyboardTrigger } from 'utils'
import { PopoverProps, PopperReferenceElement } from './types'

const Popover = ({
  className,
  children,
  content,
  placement = 'top',
  trigger = 'hover',
  visible,
  offset = [0, 0],
  ...props
}: PopoverProps) => {
  const { common } = useTranslations()

  const [isVisible, setVisible] = useState<boolean>(visible ?? false)
  const derivedVisibility =
    trigger === 'none' ? visible ?? isVisible : isVisible

  const [referenceElement, setReferenceElement] =
    useState<PopperReferenceElement>(null)

  const [popperElement, setPopperElement] =
    useState<PopperReferenceElement>(null)

  const modifiers: Partial<Modifier<string, Record<string, unknown>>>[] =
    useMemo(
      () => [
        {
          name: 'flip',
          enabled: true,
          options: {
            allowedAutoPlacements: ['top', 'bottom'],
          },
        },
        {
          name: 'offset',
          options: {
            offset,
          },
        },
      ],
      [offset],
    )

  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement,
    modifiers,
  })

  const triggers = useMemo(() => {
    switch (trigger) {
      case 'click':
        return {
          tabIndex: 0,
          onClick: () => setVisible((prev) => !prev),
          onKeyPress: (event: React.KeyboardEvent) => {
            if (checkKeyboardTrigger(event.code)) {
              event.preventDefault()
              setVisible((prev) => !prev)
            }
          },
        }
      case 'hover':
        return {
          tabIndex: 0,
          onMouseEnter: () => setVisible(true),
          onMouseLeave: () => setVisible(false),
          onFocus: () => setVisible(true),
          onBlur: () => setVisible(false),
        }
      case 'none':
      default:
        return {}
    }
  }, [trigger])

  const increaseHoverArea = trigger === 'hover' && derivedVisibility

  return (
    <>
      <div
        ref={setReferenceElement}
        className="child:z-1 child:relative relative inline-block cursor-pointer"
        {...triggers}
      >
        {increaseHoverArea && (
          <div
            role="none"
            className="top-1/2 left-1/2"
            style={{
              position: 'absolute',
              transform: 'translate(-50%, -50%)',
              width: `calc(100% + ${offset[0] + 8}px)`,
              height: `calc(100% + ${offset[1] + 8}px)`,
            }}
          />
        )}

        {children}
      </div>

      {derivedVisibility && (
        <div
          ref={setPopperElement}
          style={styles.popper}
          {...attributes.popper}
          className={clsx(
            'z-51 animate-fadeIn',
            className,
            attributes.popper?.className,
          )}
          {...props}
          {...(trigger === 'hover' ? { ...triggers, tabIndex: undefined } : {})}
        >
          {Children.map(content, (contentChild) => {
            if (!isValidElement(contentChild)) return contentChild
            if (typeof contentChild.type === 'string') return contentChild

            return cloneElement(contentChild, {
              'aria-hidden': false,
              disabled: false,
              hidden: false,
            })
          })}
        </div>
      )}

      {trigger === 'click' && derivedVisibility && (
        <button
          type="button"
          className="bg-backdrop animate-fadeIn fixed top-0 left-0 z-50 h-screen w-screen"
          aria-label={common.PopoverCloseLabel}
          onClick={() => setVisible(false)}
        />
      )}
    </>
  )
}

export default Popover
