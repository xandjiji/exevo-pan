import NextLink from 'next/link'
import { routes } from 'Constants'
import * as S from './styles'
import { HomeProps } from './types'

const Home = ({ initialPosts }: HomeProps): JSX.Element => {
  console.log(initialPosts)

  return (
    <S.Wrapper>
      {initialPosts.map(({ title, date, slug, description, tags }) => (
        <div style={{ marginBottom: 60 }}>
          <h2>{title}</h2>
          <h2>{date}</h2>
          <NextLink href={`${routes.BLOG}/${slug}`}>Go to</NextLink>
          <h2>{slug}</h2>
          <h2>{description}</h2>
          <h2>[{tags.join(', ')}]</h2>
        </div>
      ))}
    </S.Wrapper>
  )
}

export default Home
