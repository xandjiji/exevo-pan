import { useCallback } from 'react'
import { Input, Chip } from 'components/Atoms'
import { useFetchPosts } from '../../../contexts/useFetchPosts'
import useDebouncedFilter from './useDebouncedFilter'
import * as S from './styles'

const tags = [
  {
    name: 'Article',
    id: 'article',
  },
  {
    name: 'News',
    id: 'news',
  },
]

const Filters = (): JSX.Element => {
  const { filterOptions, dispatchFetchPosts } = useFetchPosts()

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
      <Input value={query} onChange={onQueryChange} placeholder="Search" />

      {tags.map(({ id, name }) => (
        <Chip
          key={id}
          overrideStatus={filterOptions.tags.has(id)}
          onClick={() => dispatchFetchPosts({ type: 'TOGGLE_TAG', tag: id })}
        >
          {name}
        </Chip>
      ))}
    </S.Wrapper>
  )
}

export default Filters
