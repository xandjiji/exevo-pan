import { memo } from 'react'
import { formatNumberWithCommas } from 'utils'
import * as S from './atoms'
import { CharacterCharmsProps } from './types'

const CharacterCharms = ({ charmPoints, ...props }: CharacterCharmsProps) => (
  <S.TitleWrapper {...props}>
    <S.Icons.Charm />
    Charm points: {formatNumberWithCommas(charmPoints ?? 0)}
  </S.TitleWrapper>
)

export default memo(CharacterCharms)
