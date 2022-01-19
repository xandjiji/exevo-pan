import styled from 'styled-components'
import Image from 'next/image'
import { Button as BaseButton } from 'components/Atoms'
import { MaterialCard } from 'styles'
import MailboxPng from 'assets/mailbox.png'
import LetterPng from 'assets/letter.png'

export const Wrapper = styled.section`
  ${MaterialCard}
  padding: 16px;
  background-color: var(--primaryVariant);

  display: grid;
  gap: 24px;
`

export const Title = styled.h4`
  position: relative;
  font-size: 18px;
  font-weight: 300;
`

export const ImageWrapper = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  z-index: -1;
`

export const MailboxImage = styled(Image).attrs({
  src: MailboxPng,
})`
  filter: grayscale(0.75);
  opacity: 0.1;
`

export const FormGroup = styled.div`
  display: grid;
  gap: 6px;
`

export const Label = styled.label``

export const Button = styled(BaseButton)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
`

export const LetterImage = styled(Image).attrs({
  src: LetterPng,
})``
