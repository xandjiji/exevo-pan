import { memo, useMemo } from 'react'
import * as S from './styles'
import { ListerProps } from './types'

const Lister = ({
  maxLines,
  partialList,
  fullList,
}: ListerProps): JSX.Element => {
  const partialSet = useMemo(
    () => new Set<string>([...partialList]),
    [partialList],
  )

  return (
    <S.Ul maxLines={maxLines}>
      {fullList.map((item) => (
        <S.Li key={item} data-active={partialSet.has(item)}>
          {item}
        </S.Li>
      ))}
    </S.Ul>
  )
}

export default memo(Lister)
