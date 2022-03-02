import { useMemo } from 'react'
import { SpritePortrait } from 'components/Atoms'
import * as S from './styles'
import { SpriteBoxProps } from './types'

const SpriteBox = ({
  offset = false,
  name,
  srcResolver,
}: SpriteBoxProps): JSX.Element => {
  const resolvedSrc = useMemo(() => srcResolver(name), [name])

  return (
    <S.Wrapper title={name}>
      <SpritePortrait
        offset={offset}
        alt={name}
        src={resolvedSrc}
        width={64}
        height={64}
      />
    </S.Wrapper>
  )
}

export default SpriteBox
