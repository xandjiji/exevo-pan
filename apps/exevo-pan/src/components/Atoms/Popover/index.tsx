import { useTranslations } from 'contexts/useTranslation'
import {
  useState,
  useMemo,
  Children,
  isValidElement,
  cloneElement,
} from 'react'
import { usePopper } from 'react-popper'
import { Modifier } from '@popperjs/core'
import { checkKeyboardTrigger } from 'utils'
import * as S from './styles'
import { PopoverProps, PopperReferenceElement } from './types'

const Popover = ({
  children,
  content,
  placement = 'top',
  trigger = 'hover',
  visible,
  offset = [0, 0],
  ...props
}: PopoverProps): JSX.Element => {
  const {
    translations: { common },
  } = useTranslations()

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

  return (
    <>
      <S.PopoverReference
        ref={setReferenceElement}
        padX={offset[0]}
        padY={offset[1]}
        increaseHoverArea={trigger === 'hover' && derivedVisibility}
        {...triggers}
      >
        {children}
      </S.PopoverReference>
      {derivedVisibility && (
        <S.PopoverContent
          ref={setPopperElement}
          aria-hidden="false"
          style={styles.popper}
          {...attributes.popper}
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
        </S.PopoverContent>
      )}
      {trigger === 'click' && derivedVisibility && (
        <S.Backdrop
          aria-label={common.PopoverCloseLabel}
          onClick={() => setVisible(false)}
        />
      )}
    </>
  )
}

export default Popover
