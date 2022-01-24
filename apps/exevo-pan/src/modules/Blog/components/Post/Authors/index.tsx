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
        characterData={author}
        outfitSrc={author.outfitSrc}
        displayLink
        style={translator ? { marginBottom: 8 } : undefined}
      />
      {translator && (
        <CharacterMiniCard
          forceSubtitle={blog.Authors.translator}
          characterData={translator}
          outfitSrc={translator.outfitSrc}
          displayLink
        />
      )}
    </footer>
  )
}

export default Authors
