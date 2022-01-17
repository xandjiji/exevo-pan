import { FetchPostsProvider } from '../../contexts/useFetchPosts'
import { Newsletter } from '..'
import Filters from './Filters'
import PostGrid from './PostGrid'
import * as S from './styles'
import { HomeProps } from './types'

const Home = ({ initialIndex, initialPosts }: HomeProps): JSX.Element => (
  <FetchPostsProvider initialIndex={initialIndex} initialPosts={initialPosts}>
    <S.Hero title="Blog" src="https://i.imgur.com/5RuluNc.png" />
    <S.Wrapper>
      <Filters />
      <PostGrid />
      <Newsletter />
    </S.Wrapper>
  </FetchPostsProvider>
)

export default Home
