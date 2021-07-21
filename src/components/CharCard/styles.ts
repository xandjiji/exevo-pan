import styled from 'styled-components'
import {
  SpritePortrait as BaseSpriteProtrait,
  FavButton as BaseFavButton,
  LabeledTextBox as BaseLabeledTextBox,
} from 'components/Atoms'
import { MaterialCard } from 'styles'

const AlignedFlex = styled.div`
  display: flex;
  align-items: center;
`

export const Wrapper = styled.div`
  ${MaterialCard}
  padding: 16px;
`

export const Head = styled(AlignedFlex)`
  margin-bottom: 16px;

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
export const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: 50% 50%;
  grid-column-gap: 8px;
  grid-row-gap: 12px;
`

export const LabeledTextBox = styled(BaseLabeledTextBox)`
  font-size: 14px;
`
