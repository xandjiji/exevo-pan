import NextLink from 'next/link'
import { routes } from 'Constants'
import { useFetchPromos } from '../../../contexts/useFetchPosts'
import * as S from './styles'

const PostGrid = (): JSX.Element => {
  const { postList } = useFetchPromos()

  return (
    <S.Grid>
      {postList.map(({ title, date, slug, description, tags }) => (
        <div style={{ marginBottom: 60 }}>
          <h2>{title}</h2>
          <h2>{date}</h2>
          <NextLink href={`${routes.BLOG}/${slug}`}>Go to</NextLink>
          <h2>{slug}</h2>
          <h2>{description}</h2>
          <h2>[{tags.join(', ')}]</h2>
        </div>
      ))}
    </S.Grid>
  )
}

export default PostGrid
