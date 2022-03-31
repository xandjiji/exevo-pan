import styled from 'styled-components'
import Image from 'next/image'
import TibiaCoinImage from 'assets/tibiacoin.png'

export const ClickableTR = styled.tr`
  cursor: pointer;

  &:hover td:first-child [data-offset='true'] {
    transform: translateX(3px);
  }
`

export const Flex = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  white-space: nowrap;

  > * {
    flex-shrink: 0;
  }
`

export const TibiaCoinIcon = styled(Image).attrs({
  src: TibiaCoinImage,
  alt: 'Tibia Coin',
  unoptimized: true,
})`
  width: 12px;
  height: 12px;
`
