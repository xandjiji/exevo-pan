import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import useIsMounted from 'hooks/useIsMounted'
import { useCharacters, useDatabaseDispatch } from 'contexts/useDatabase'
import { routes } from 'Constants'
import CharacterGrid from './components/CharacterGrid'

const BazaarAuctions = (): JSX.Element => {
  const { characterData, historyData, loading } = useCharacters()
  const { dispatch } = useDatabaseDispatch()
  const { pathname } = useLocation()
  const isMounted = useIsMounted()

  const isHistory = pathname === routes.BAZAAR_HISTORY

  const characterList = isHistory ? historyData : characterData
  const defaultDescendingOrder = isHistory

  useEffect(() => {
    document.title = `Exevo Pan - ${
      isHistory ? 'Bazaar History' : 'Current Auctions'
    }`
  }, [isHistory])

  useEffect(() => {
    if (isMounted) dispatch({ type: 'RESET_TO_BASE_DATA' })
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
