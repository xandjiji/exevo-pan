import { memo } from 'react'
import Image from 'next/image'
import tibiaCoinSrc from 'assets/tibiacoin.png'
import { formatNumberWithCommas } from 'utils'
import * as S from './atoms'

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
      <Image
        src={tibiaCoinSrc}
        alt="Tibia Coin"
        unoptimized
        width={12}
        height={12}
        className="select-none"
      />
      {formattedValue}
    </S.Flex>
  )
}

export default memo(TibiaCoin)
