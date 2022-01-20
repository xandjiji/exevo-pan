import CharacterMiniCard from 'components/CharacterMiniCard'
import { BlockSection } from '..'
import * as S from './styles'
import { AuthorsProps } from './types'

const Authors = ({ author, translator }: AuthorsProps): JSX.Element => (
  <BlockSection>
    <CharacterMiniCard characterData={author} outfitSrc={author.outfitSrc} />
    {translator && (
      <CharacterMiniCard
        characterData={translator}
        outfitSrc={translator.outfitSrc}
      />
    )}
  </BlockSection>
)

export default Authors
