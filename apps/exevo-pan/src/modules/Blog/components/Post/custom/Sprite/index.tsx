import * as S from './styles'
import { SpriteProps } from './types'

const Sprite = ({
  src,
  width,
  height,
  inline = false,
  children,
}: SpriteProps): JSX.Element => (
  <S.Wrapper src={src} width={width} height={height} inline={inline}>
    {children}
  </S.Wrapper>
)

export default Sprite
