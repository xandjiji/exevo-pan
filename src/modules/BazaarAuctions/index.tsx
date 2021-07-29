import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useCharacters, useDatabaseDispatch } from 'contexts/useDatabase'
import CharacterGrid from './components/CharacterGrid'

const BazaarAuctions = (): JSX.Element => {
  const { characterData, historyData, loading } = useCharacters()
  const { dispatch } = useDatabaseDispatch()
  const { pathname } = useLocation()

  const isHistory = pathname === '/bazaar-history'

  const characterList = isHistory ? historyData : characterData
  const defaultDescendingOrder = isHistory

  useEffect(() => {
    document.title = `Exevo Pan - ${
      isHistory ? 'Bazaar History' : 'Current Auctions'
    }`
  }, [isHistory])

  useEffect(() => {
    console.log(pathname)
    console.log(dispatch)
  }, [pathname, dispatch])

  return (
    <CharacterGrid
      characterList={characterList}
      defaultDescendingOrder={defaultDescendingOrder}
      isLoading={loading}
    />
  )
}

export default BazaarAuctions
