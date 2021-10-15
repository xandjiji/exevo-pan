import { useCharacters } from 'contexts/useDatabase'
import CharacterGrid from './components/CharacterGrid'

export const CurrentAuctions = (): JSX.Element => {
  const { characterData, highlightedAuctions, loading } = useCharacters()

  return (
    <CharacterGrid
      characterList={characterData}
      highlightedList={highlightedAuctions}
      isLoading={loading}
    />
  )
}

export const BazaarHistory = (): JSX.Element => {
  const { historyData, loading } = useCharacters()

  return (
    <CharacterGrid
      characterList={historyData}
      defaultDescendingOrder
      isLoading={loading}
    />
  )
}
