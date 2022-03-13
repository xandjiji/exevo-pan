import { useTranslations } from 'contexts/useTranslation'
import { useState, useCallback } from 'react'
import { useUuid } from 'hooks'
import * as S from './styles'
import { AccordionProps } from './types'

const Accordion = ({
  title,
  initialValue = false,
  open: openProp,
  onClick,
  border = false,
  children,
  ...props
}: AccordionProps): JSX.Element => {
  const {
    translations: { common },
  } = useTranslations()

  const buttonId = useUuid()
  const contentId = useUuid()

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
        border={border}
        suppressHydrationWarning
      >
        {title}
        <S.ArrowIcon />
      </S.Button>
      <S.Content
        id={contentId}
        aria-describedby={buttonId}
        suppressHydrationWarning
      >
        {open && children}
      </S.Content>
    </S.Wrapper>
  )
}

export default Accordion
