import { useTranslations } from 'contexts/useTranslation'
import CharacterMiniCard from 'components/CharacterMiniCard'
import * as S from './styles'
import { AuthorsProps } from './types'

const Authors = ({ author, translator }: AuthorsProps): JSX.Element => {
  const {
    translations: { blog },
  } = useTranslations()

  return (
    <footer>
      <S.Title>
        {blog.Authors.headline1}
        <br />
        {blog.Authors.headline2} 😄
      </S.Title>
      <CharacterMiniCard
        forceSubtitle={blog.Authors.author}
        characterName={author.name}
        outfitSrc={author.outfit}
        displayLink
        style={translator ? { marginBottom: 8 } : undefined}
      />
      {translator && (
        <CharacterMiniCard
          forceSubtitle={blog.Authors.translator}
          characterName={translator.name}
          outfitSrc={translator.outfit}
          displayLink
        />
      )}
    </footer>
  )
}

export default Authors
