import styled from 'styled-components'
import { Sticker as BaseSticker } from 'components/Atoms'

export const Wrapper = styled.div`
  &:not(:last-child) {
    padding-bottom: 16px;
    border-bottom: solid 1px;
    border-color: var(--separator);
  }
`

export const LabelWrapper = styled.div`
  position: relative;
  margin-bottom: 8px;
  display: flex;
  align-items: center;
`

export const Label = styled.label`
  font-size: 12px;
  font-weight: 300;
  letter-spacing: 0.2px;
  color: var(--onSurface);
`

export const Sticker = styled(BaseSticker)`
  position: absolute;
  bottom: 100%;
  right: 100%;
  transform: rotate(-15deg);
`
