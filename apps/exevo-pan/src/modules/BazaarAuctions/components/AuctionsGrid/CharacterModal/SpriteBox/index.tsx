import { useMemo } from 'react'
import { SpritePortrait } from 'components/Atoms'
import * as S from './styles'
import { SpriteBoxProps } from './types'

const SpriteBox = ({
  offset = false,
  name,
  src,
  rareSet,
}: SpriteBoxProps): JSX.Element => {
  const isRare = useMemo(() => (rareSet ? rareSet.has(name) : false), [name])

  return (
    <S.Wrapper title={name} data-rare={isRare}>
      <SpritePortrait
        offset={offset}
        alt={name}
        src={src}
        width={64}
        height={64}
      />
    </S.Wrapper>
  )
}

export default SpriteBox
