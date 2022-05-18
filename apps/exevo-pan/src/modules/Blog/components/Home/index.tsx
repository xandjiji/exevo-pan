import { useTranslations } from 'contexts/useTranslation'
import { FetchPostsProvider } from '../../contexts/useFetchPosts'
import Hero from '../Hero'
import Newsletter from '../Newsletter'
import Filters from './Filters'
import PostGrid from './PostGrid'
import styles from './styles.module.css'
import { HomeProps } from './types'

const Home = ({ initialIndex, initialPosts }: HomeProps) => {
  const {
    translations: { blog },
  } = useTranslations()

  return (
    <>
      <Hero
        className={styles.hero}
        title={blog.Meta.title}
        src="https://i.imgur.com/Jjh4f3q.png"
      />
      <main className="inner-container flex flex-col gap-8 pb-8 lg:flex-row-reverse">
        <FetchPostsProvider
          initialIndex={initialIndex}
          initialPosts={initialPosts}
        >
          <aside className="top-[120px] flex h-min shrink-0 flex-col gap-8 lg:sticky">
            <Newsletter />
            <Filters />
          </aside>
          <PostGrid />
        </FetchPostsProvider>
      </main>
    </>
  )
}

export default Home
