import { useTranslations } from 'contexts/useTranslation'
import CharacterMiniCard from 'components/CharacterMiniCard'
import { AuthorsProps } from './types'

const Authors = ({ author, translator }: AuthorsProps) => {
  const {
    translations: { blog },
  } = useTranslations()

  return (
    <footer>
      <h3 className="text-txl mb-4 font-light leading-tight tracking-wide">
        {blog.Authors.headline1}
        <br />
        {blog.Authors.headline2} 😄
      </h3>
      <CharacterMiniCard
        forceSubtitle={blog.Authors.author}
        characterName={author}
        outfitSrc={`/blog/authors/${author}.png`}
        linkUrl={`https://www.tibia.com/community/?name=${author}`}
        style={translator ? { marginBottom: 8 } : undefined}
      />
      {translator && (
        <CharacterMiniCard
          forceSubtitle={blog.Authors.translator}
          characterName={translator}
          outfitSrc={`/blog/authors/${translator}.png`}
          linkUrl={`https://www.tibia.com/community/?name=${translator}`}
        />
      )}
    </footer>
  )
}

export default Authors
