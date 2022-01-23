import { FadeImage } from 'components/Atoms'
import * as S from './styles'
import { ImageProps } from './types'

const Image = ({
  id,
  className,
  align = 'left',
  caption,
  ...props
}: ImageProps): JSX.Element => (
  <S.Figure id={id} className={className} data-align={align}>
    <FadeImage {...props} />
    {caption && <S.Caption>{caption}</S.Caption>}
  </S.Figure>
)

export default Image
