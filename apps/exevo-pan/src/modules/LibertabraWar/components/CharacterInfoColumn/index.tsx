import { memo } from 'react'
import * as S from './styles'
import { CharacterInfoColumnProps } from './types'

const CharacterInfoColumn = ({
  nickname,
  level,
  vocation,
  ...props
}: CharacterInfoColumnProps): JSX.Element => (
  <S.CharacterColumn {...props}>
    <a
      href={`https://www.tibia.com/community/?name=${encodeURIComponent(
        nickname,
      )}`}
      target="_blank"
      rel="noreferrer noopener"
    >
      {nickname}
    </a>
    <S.CharacterInfo>{`Level ${level} - ${vocation}`}</S.CharacterInfo>
  </S.CharacterColumn>
)

export default memo(CharacterInfoColumn)
