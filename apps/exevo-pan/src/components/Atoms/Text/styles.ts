import styled from 'styled-components'
import Image from 'next/image'
import TibiaCoinImage from 'assets/tibiacoin.png'

export const Flex = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  white-space: nowrap;

  > * {
    flex-shrink: 0;
  }
`

export const Icon = {
  TibiaCoin: styled(Image).attrs({
    src: TibiaCoinImage,
    alt: 'Tibia Coin',
    unoptimized: true,
  })`
    width: 12px;
    height: 12px;
  `,
}
