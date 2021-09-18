import { useCharacters } from 'contexts/useDatabase'
import { SelectedCharacterProvider } from './contexts/SelectedCharacter'
import { AuctionSearch, CharacterCard } from './components'
import * as S from './styles'

const AdvertiseGrid = (): JSX.Element => {
  const { loading } = useCharacters()

  return (
    <S.Wrapper>
      <SelectedCharacterProvider>
        {loading && <S.Loading />}
        <AuctionSearch />
        <CharacterCard />
      </SelectedCharacterProvider>
    </S.Wrapper>
  )
}

export default AdvertiseGrid
