import styled from 'styled-components'
import { ActiveCount as BaseActiveCount } from 'components/Atoms'

export const ItemWrapper = styled.div`
  margin-bottom: 12px;
  display: flex;
  justify-content: space-around;
`

export const SpriteWrapper = styled.div`
  position: relative;
`

export const ActiveCount = styled(BaseActiveCount)`
  position: absolute;
  top: 0;
  right: 0;
  transform: translate(50%, -50%);
  z-index: 1;
`
