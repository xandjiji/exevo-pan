import { useMemo } from 'react'
import { SpritePortrait } from 'components/Atoms'
import * as S from './styles'
import { SpriteBoxProps } from './types'

const SpriteBox = ({
  offset = false,
  name,
  srcResolver,
  rareSet,
}: SpriteBoxProps): JSX.Element => {
  const resolvedSrc = useMemo(() => srcResolver(name), [name])
  const isRare = useMemo(() => (rareSet ? rareSet.has(name) : false), [name])

  return (
    <S.Wrapper title={name} data-rare={isRare}>
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
