import { memo } from 'react'
import { formatNumberWithCommas, loadRawSrc } from 'utils'
import * as S from './atoms'

const tibiaCoinSrc = loadRawSrc('/assets/tibiacoin.png')

type TibiaCoinProps = {
  value: number
  displaySign?: boolean
} & React.HTMLAttributes<HTMLSpanElement>

const TibiaCoin = ({
  value,
  displaySign = false,
  ...props
}: TibiaCoinProps) => {
  const formattedValue = formatNumberWithCommas(value, displaySign)

  return (
    <S.Flex title={`${formattedValue} Tibia Coins`} {...props}>
      <img
        src={tibiaCoinSrc}
        alt="Tibia Coin"
        width={12}
        height={12}
        className="pixelated select-none self-center"
      />
      {formattedValue}
    </S.Flex>
  )
}

export default memo(TibiaCoin)
