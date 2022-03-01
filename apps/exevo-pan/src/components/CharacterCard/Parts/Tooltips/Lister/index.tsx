import { memo, useMemo } from 'react'
import * as S from './styles'
import { ListerProps } from './types'

const Lister = ({ partialList, fullList }: ListerProps): JSX.Element => {
  const partialSet = useMemo(
    () => new Set<string>([...partialList]),
    [partialList],
  )

  return (
    <S.Ul>
      {fullList.map((item) => (
        <S.Li data-active={partialSet.has(item)}>{item}</S.Li>
      ))}
    </S.Ul>
  )
}

export default memo(Lister)
