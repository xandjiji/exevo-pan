import styled from 'styled-components'
import { SpritePortrait as BaseSpriteProtrait } from 'components/Atoms'
import { Clickable } from 'styles'
import ExternalIconSvg from 'assets/svgs/external.svg'

export const Wrapper = styled.div`
  padding: 0px 8px;
  display: flex;
  align-items: center;
  gap: 16px;

  > *:first-child {
    width: 56px;
    height: 56px;
    flex-shrink: 0;
  }
`

export const SpritePortrait = styled(BaseSpriteProtrait)`
  margin-top: -24px;
  margin-left: -24px;
  width: 64px;
  height: 64px;
`

export const Nickname = styled.p`
  &&& {
    margin-bottom: -1px;
    display: flex;
    align-items: center;
    font-size: 16px;
    font-weight: 600;
    color: var(--primary);
    filter: brightness(130%);

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
