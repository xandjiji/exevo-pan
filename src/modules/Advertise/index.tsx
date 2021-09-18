import { useCharacters } from 'contexts/useDatabase'
import { AuctionSearch } from './components'
import * as S from './styles'

const AdvertiseGrid = (): JSX.Element => {
  const { loading } = useCharacters()

  return (
    <S.Wrapper>
      {loading && <S.Loading />}
      <AuctionSearch />
    </S.Wrapper>
  )
}

export default AdvertiseGrid
