import CharacterMiniCard from 'components/CharacterMiniCard'
import * as S from './styles'
import { AuthorsProps } from './types'

const Authors = ({ author, translator }: AuthorsProps): JSX.Element => (
  <section>
    <S.Title>
      Enjoyed this content?
      <br />
      Support the authors donating Tibia Coins 😄
    </S.Title>
    <CharacterMiniCard
      forceSubtitle="Author"
      characterData={author}
      outfitSrc={author.outfitSrc}
      displayLink
      style={translator ? { marginBottom: 8 } : undefined}
    />
    {translator && (
      <CharacterMiniCard
        forceSubtitle="Translator"
        characterData={translator}
        outfitSrc={translator.outfitSrc}
        displayLink
      />
    )}
  </section>
)

export default Authors
