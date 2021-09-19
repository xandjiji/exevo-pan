import { SelectedCharacterProvider } from './contexts/SelectedCharacter'
import { AuctionSearch, CharacterCard } from './components'
import * as S from './styles'

const AdvertiseGrid = (): JSX.Element => (
  <S.Wrapper>
    <SelectedCharacterProvider>
      <AuctionSearch />
      <CharacterCard />
    </SelectedCharacterProvider>
  </S.Wrapper>
)

export default AdvertiseGrid
