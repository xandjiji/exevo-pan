import styled from 'styled-components'
import { SpritePortrait as BaseSpriteProtrait } from 'components/Atoms'
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

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  width: fit-content;
  cursor: pointer;
  ${Smooth}

  > *:first-child {
    width: 56px;
    height: 56px;
  }

  :hover {
    transform: translateX(3px);
  }
`
