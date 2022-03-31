import { formatNumberWithCommas } from 'utils'
import * as S from './styles'

type TibiaCoinProps = {
  value: number
} & React.HTMLAttributes<HTMLSpanElement>

const TibiaCoin = ({ value, ...props }: TibiaCoinProps): JSX.Element => {
  const formattedValue = formatNumberWithCommas(value)

  return (
    <S.Flex title={`${formattedValue} Tibia Coins`} {...props}>
      <S.Icon.TibiaCoin />
      {formattedValue}
    </S.Flex>
  )
}

export default TibiaCoin
