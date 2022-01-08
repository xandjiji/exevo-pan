import { useTranslations } from 'contexts/useTranslation'
import { useRef, useState, useCallback } from 'react'
import { v4 as uuidv4 } from 'uuid'
import * as S from './styles'
import { AccordionProps } from './types'

const Accordion = ({
  title,
  initialValue = false,
  open: openProp,
  onClick,
  children,
  ...props
}: AccordionProps): JSX.Element => {
  const {
    translations: { common },
  } = useTranslations()

  const { current: buttonId } = useRef(uuidv4())
  const { current: contentId } = useRef(uuidv4())

  const [innerOpen, setOpen] = useState(initialValue)
  const open = openProp ?? innerOpen

  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      setOpen((prev) => !prev)
      onClick?.(event)
    },
    [onClick],
  )

  return (
    <S.Wrapper {...props}>
      <S.Button
        id={buttonId}
        role="button"
        aria-expanded={open}
        aria-controls={contentId}
        aria-label={common.Accordion[open ? 'close' : 'open']}
        onClick={handleClick}
      >
        {title}
        <S.ArrowIcon />
      </S.Button>
      <S.Content id={contentId} aria-describedby={buttonId}>
        {open && children}
      </S.Content>
    </S.Wrapper>
  )
}

export default Accordion
