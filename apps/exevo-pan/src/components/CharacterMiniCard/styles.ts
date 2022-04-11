import styled from 'styled-components'
import { MaterialCard, Clickable } from 'styles'
import ExternalIconSvg from 'assets/svgs/external.svg'

export const Wrapper = styled.div<{ isCard: boolean }>`
  ${({ isCard }) => isCard && MaterialCard}
  display: flex;
  align-items: center;
  gap: 16px;
`

export const Nickname = styled.p`
  &&& {
    margin: 0;
    display: flex;
    align-items: center;
    font-size: 16px;
    font-weight: 700;
    color: var(--primaryHighlight);

    a {
      margin-left: 4px;
      font-size: 0;
    }
  }
`

export const Link = styled.a`
  &::after {
    display: none;
  }
`

export const ExternalIcon = styled(ExternalIconSvg)`
  margin-top: -2px;
  padding: 2px;
  width: 28px;
  height: 28px;
  border-radius: 4px;
  fill: var(--onSurface);
  ${Clickable}
`

export const Description = styled.span`
  && {
    font-size: 12px;
    font-weight: 300;
    letter-spacing: 0.5px;
    color: var(--onSurface);
  }
`
