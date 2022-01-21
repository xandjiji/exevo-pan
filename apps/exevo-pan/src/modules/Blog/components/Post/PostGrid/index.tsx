import Card from './Card'
import * as S from './styles'
import { PostGridProps } from './types'

const PostGrid = ({ gridTitle, posts }: PostGridProps): JSX.Element => (
  <section>
    {gridTitle && <S.Title>{gridTitle}</S.Title>}

    <S.Grid>
      {posts.map((post) => (
        <Card key={post.slug} post={post} />
      ))}
    </S.Grid>
  </section>
)
export default PostGrid
