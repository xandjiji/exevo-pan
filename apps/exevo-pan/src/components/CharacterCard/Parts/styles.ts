import styled from 'styled-components'
import Image from 'next/image'
import { LabeledTextBox as BaseLabeledTextBox } from 'components/Atoms'
import TibiaCoinImage from 'assets/tibiacoin.png'

export const LabeledTextBox = styled(BaseLabeledTextBox)`
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 14px;
`

const TibiaCoin = styled(Image).attrs({
  src: TibiaCoinImage,
  alt: 'Tibia Coin',
  unoptimized: true,
})`
  width: 12px;
  height: 12px;
`

export const Icons = { TibiaCoin }
