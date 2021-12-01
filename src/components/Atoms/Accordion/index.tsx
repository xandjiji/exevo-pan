import { useState, useCallback } from 'react'
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
      <S.Button role="button" aria-expanded={open} onClick={handleClick}>
        {title}
        <S.ArrowIcon />
      </S.Button>
      <S.Content>{open && children}</S.Content>
    </S.Wrapper>
  )
}

export default Accordion
