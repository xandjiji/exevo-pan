import { memo } from 'react'
import Image from 'next/image'
import goldCoinSrc from 'assets/goldcoin.png'
import { formatNumberWithCommas } from 'utils'
import * as S from './atoms'

type GoldCoinProps = {
  value: number
  displaySign?: boolean
} & React.HTMLAttributes<HTMLSpanElement>

const GoldCoin = ({ value, displaySign = false, ...props }: GoldCoinProps) => {
  const formattedValue = formatNumberWithCommas(value, displaySign)

  return (
    <S.Flex title={`${formattedValue} gp`} {...props}>
      <Image
        src={goldCoinSrc}
        alt="Gold Coin"
        unoptimized
        width={9}
        height={9}
        className="select-none"
      />
      {formattedValue}
    </S.Flex>
  )
}

export default memo(GoldCoin)
