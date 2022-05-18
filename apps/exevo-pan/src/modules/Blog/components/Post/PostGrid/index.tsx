import Card from './Card'
import { PostGridProps } from './types'

const PostGrid = ({ gridTitle, posts }: PostGridProps) => (
  <section>
    {gridTitle && (
      <h3
        className="border-separator mb-3 border-solid pb-1 text-[32px] font-normal tracking-wide"
        style={{ borderWidth: 0, borderBottomWidth: 1 }}
      >
        {gridTitle}
      </h3>
    )}

    <ul className="grid gap-2">
      {posts.map((post) => (
        <Card key={post.slug} post={post} />
      ))}
    </ul>
  </section>
)
export default PostGrid
