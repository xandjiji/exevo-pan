import { memo } from 'react'
import { formatNumberWithCommas, loadRawSrc } from 'utils'
import * as S from './atoms'

const goldCoinSrc = loadRawSrc('/assets/goldcoin.png')

type GoldCoinProps = {
  value: number
  displaySign?: boolean
} & React.HTMLAttributes<HTMLSpanElement>

const GoldCoin = ({ value, displaySign = false, ...props }: GoldCoinProps) => {
  const formattedValue = formatNumberWithCommas(value, displaySign)

  return (
    <S.Flex title={`${formattedValue} gp`} {...props}>
      <img
        src={goldCoinSrc}
        alt="Gold Coin"
        width={9}
        height={9}
        className="pixelated select-none self-center"
      />
      {formattedValue}
    </S.Flex>
  )
}

export default memo(GoldCoin)
