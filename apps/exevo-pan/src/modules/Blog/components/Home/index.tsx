import { FetchPostsProvider } from '../../contexts/useFetchPosts'
import Filters from './Filters'
import PostGrid from './PostGrid'
import { Newsletter } from '..'
import * as S from './styles'
import { HomeProps } from './types'

const Home = ({ initialIndex, initialPosts }: HomeProps): JSX.Element => (
  <FetchPostsProvider initialIndex={initialIndex} initialPosts={initialPosts}>
    <S.Wrapper>
      <Filters />
      <PostGrid />
      <Newsletter />
    </S.Wrapper>
  </FetchPostsProvider>
)

export default Home
