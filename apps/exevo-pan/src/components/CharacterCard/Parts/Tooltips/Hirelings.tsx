import { memo } from 'react'
import * as S from './atoms'
import { CharacterHirelingsProps } from './types'

const MAX_JOBS = 4

const CharacterHirelings = ({
  hirelingsInfo,
  ...props
}: CharacterHirelingsProps) => (
  <S.TitleWrapper {...props}>
    <S.Icons.Hireling />
    Hirelings: {hirelingsInfo.count} (
    <strong style={{ marginRight: 3 }}>
      {hirelingsInfo.jobs}/{MAX_JOBS}
    </strong>{' '}
    jobs, <strong style={{ margin: '0 3px' }}>{hirelingsInfo.outfits}</strong>{' '}
    outfits)
  </S.TitleWrapper>
)

export default memo(CharacterHirelings)
