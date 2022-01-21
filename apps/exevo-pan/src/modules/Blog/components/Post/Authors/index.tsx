import CharacterMiniCard from 'components/CharacterMiniCard'
import * as S from './styles'
import { AuthorsProps } from './types'

const Authors = ({ author, translator }: AuthorsProps): JSX.Element => (
  <S.BlockSection>
    <S.Title>
      Enjoyed this content?
      <br />
      Support the authors donating Tibia Coins 😄
    </S.Title>
    <CharacterMiniCard
      characterData={author}
      outfitSrc={author.outfitSrc}
      displayLink
      style={translator ? { marginBottom: 8 } : undefined}
    />
    {translator && (
      <CharacterMiniCard
        characterData={translator}
        outfitSrc={translator.outfitSrc}
        displayLink
      />
    )}
  </S.BlockSection>
)

export default Authors
