import { useState } from 'react'
import * as S from './styles'

const SpritePortrait = ({
  src,
  ...props
}: React.ImgHTMLAttributes<HTMLImageElement>): JSX.Element => {
  const [loaded, setLoaded] = useState<boolean>(!!!src)

  return (
    <S.Wrapper>
      <S.Img
        src={src}
        aria-hidden={!!!src || !loaded}
        hidden={!!!src}
        onLoad={() => setLoaded(true)}
        onError={() => setLoaded(false)}
        {...props}
      />
      <S.Spinner
        role="alert"
        aria-label="Loading indicator"
        aria-busy="true"
        aria-hidden={loaded}
      />
    </S.Wrapper>
  )
}

export default SpritePortrait
