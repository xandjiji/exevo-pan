import { useState, useMemo } from 'react'
import { usePopper } from 'react-popper'
import { Modifier } from '@popperjs/core'
import * as S from './styles'
import { TooltipProps, PopperReferenceElement } from './types'

const Tooltip = ({
  children,
  content,
  placement = 'top',
  trigger = 'hover',
  visible = false,
  offset = [-18, 21],
  ...props
}: TooltipProps): JSX.Element => {
  const [isVisible, setVisible] = useState<boolean>(visible)

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
          onClick: () => setVisible(prev => !prev),
        }
      case 'hover':
        return {
          onMouseEnter: () => setVisible(true),
          onMouseLeave: () => setVisible(false),
        }
      default:
        return {}
    }
  }, [trigger])

  return (
    <>
      <S.TooltipReference ref={setReferenceElement} {...triggers}>
        {children}
      </S.TooltipReference>
      <S.TooltipContent
        ref={setPopperElement}
        visible={isVisible}
        style={styles.popper}
        {...attributes.popper}
        {...props}
      >
        {content}
      </S.TooltipContent>
    </>
  )
}

export default Tooltip
