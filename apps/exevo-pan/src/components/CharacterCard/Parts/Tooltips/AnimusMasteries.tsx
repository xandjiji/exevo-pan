import { formatNumberWithCommas } from 'utils'
import * as S from './atoms'

export function AnimusMasteries({
  animusMasteries = 0,
}: {
  animusMasteries?: number
}) {
  return (
    <S.TitleWrapper>
      <S.Icons.AnimusMasteries />
      Animus Masteries: {formatNumberWithCommas(animusMasteries)}
    </S.TitleWrapper>
  )
}
