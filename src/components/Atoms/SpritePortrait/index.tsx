import { useState } from 'react'
import * as S from './styles'
import { SpritePortraitProps } from './types'

const SpritePortrait = ({
  src,
  ...props
}: SpritePortraitProps): JSX.Element => {
  const [loaded, setLoaded] = useState<boolean>(!!!src)

  return (
    <S.Wrapper>
      <S.Img
        src={src}
        visible={loaded}
        hidden={!!!src}
        onLoad={() => setLoaded(true)}
        onError={() => setLoaded(false)}
        {...props}
      />
      <S.Spinner visible={!loaded} />
    </S.Wrapper>
  )
}

export default SpritePortrait
