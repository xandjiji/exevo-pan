import { useCallback } from 'react'
import { Input } from 'components/Atoms'
import { useFetchPosts } from '../../../contexts/useFetchPosts'
import useDebouncedFilter from './useDebouncedFilter'
import * as S from './styles'

const Filters = (): JSX.Element => {
  const { filterOptions } = useFetchPosts()

  const [query, setQuery] = useDebouncedFilter(
    'queryString',
    filterOptions.queryString,
  )

  const onQueryChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setQuery(event.target.value)
    },
    [],
  )

  return (
    <S.Wrapper>
      <Input value={query} onChange={onQueryChange} />
    </S.Wrapper>
  )
}

export default Filters
