import { useTranslations } from 'contexts/useTranslation'
import { FetchPostsProvider } from '../../contexts/useFetchPosts'
import Newsletter from '../Newsletter'
import Filters from './Filters'
import PostGrid from './PostGrid'
import * as S from './styles'
import { HomeProps } from './types'

const Home = ({ initialIndex, initialPosts }: HomeProps): JSX.Element => {
  const {
    translations: { blog },
  } = useTranslations()

  return (
    <FetchPostsProvider initialIndex={initialIndex} initialPosts={initialPosts}>
      <S.Hero title={blog.Meta.title} src="https://i.imgur.com/Jjh4f3q.png" />
      <S.Wrapper>
        <S.Aside>
          <Newsletter />
          <Filters />
        </S.Aside>
        <PostGrid />
      </S.Wrapper>
    </FetchPostsProvider>
  )
}

export default Home
