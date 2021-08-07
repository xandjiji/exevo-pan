import { memo } from 'react'
import * as S from './styles'
import { ListProps } from './types'

const List = ({
  title,
  charactersList,
  columnLabel,
  displayedDataKey,
  format,
  ...props
}: ListProps): JSX.Element => <S.Wrapper {...props}>list</S.Wrapper>

export default memo(List)
