import * as S from './styles'
import { NewstickerProps } from './types'

const Newsticker = ({ blogPosts, ...props }: NewstickerProps): JSX.Element => (
  <S.Wrapper {...props}>
    {blogPosts.map(({ title }) => (
      <h2 key={title}>{title}</h2>
    ))}
  </S.Wrapper>
)

export default Newsticker
