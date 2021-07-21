import styled from 'styled-components'
import {
  SpritePortrait as BaseSpriteProtrait,
  FavButton as BaseFavButton,
} from 'components/Atoms'
import { MaterialCard } from 'styles'

export const Wrapper = styled.div`
  ${MaterialCard}
  padding: 16px;
`

export const Head = styled.div`
  display: flex;
  align-items: center;

  > *:first-child {
    width: 56px;
    height: 56px;
  }
`

export const SpritePortrait = styled(BaseSpriteProtrait)`
  margin-top: -24px;
  margin-left: -24px;
  width: 64px;
  height: 64px;
`

export const HeadInfo = styled.div`
  margin: 0 16px;
  width: 100%;
`

export const Subtitle = styled.span`
  font-size: 12px;
  font-weight: 300;
  letter-spacing: 0.5px;
  color: ${({ theme }) => theme.colors.onSurface};
`

export const FavButton = styled(BaseFavButton)`
  align-self: flex-start;
`
