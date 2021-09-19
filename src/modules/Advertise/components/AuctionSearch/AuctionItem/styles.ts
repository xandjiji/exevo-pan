import styled from 'styled-components'
import { SpritePortrait as BaseSpriteProtrait } from 'components/Atoms'
import NextSvg from 'assets/svgs/next.svg'
import { Smooth } from 'styles'

export const SpritePortrait = styled(BaseSpriteProtrait)`
  margin-top: -24px;
  margin-left: -24px;
`

export const Nickname = styled.span`
  display: block;
  font-size: 16px;
  font-weight: 600;
  color: var(--primary);
  filter: brightness(130%);
`

export const Info = styled.span`
  display: block;
  font-size: 12px;
  font-weight: 300;
  letter-spacing: 0.5px;
  color: var(--onSurface);
`

export const Arrow = styled(NextSvg)`
  margin-left: auto;
  width: 32px;
  fill: var(--onSurface);
`

export const ButtonWrapper = styled.button`
  position: relative;
  display: flex;
  align-items: center;
  gap: 16px;
  width: 100%;
  text-align: left;
  cursor: pointer;
  ${Smooth}

  > *:first-child {
    width: 56px;
    height: 56px;
    background-color: var(--primaryVariant);
    ${Smooth}
  }

  :hover,
  &[aria-selected='true'] {
    transform: translateX(6px);
  }

  &[aria-selected='true'] {
    > *:first-child {
      background-color: var(--primary);
      filter: brightness(130%) saturate(80%);
    }
  }

  &:not(:last-child) ::after {
    content: '';
    position: absolute;
    top: calc(100% + 4px);
    right: 8px;
    width: calc(100% - 80px);
    height: 1px;
    background-color: var(--separator);
    opacity: 0.3;
  }
`
