import { useCallback } from 'react'
import { Input, Chip, Switch, RadioButton } from 'components/Atoms'
import { useFetchPosts } from '../../../contexts/useFetchPosts'
import useDebouncedFilter from './useDebouncedFilter'
import * as S from './styles'

const allTags = [
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
  const { filterOptions, sortOptions, dispatchFetchPosts } = useFetchPosts()

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
      <Switch
        active={sortOptions.descendingOrder}
        onClick={() =>
          dispatchFetchPosts({
            type: 'APPLY_SORT',
            sortOptions: {
              ...sortOptions,
              descendingOrder: !sortOptions.descendingOrder,
            },
          })
        }
      >
        Descending
      </Switch>
      <RadioButton
        active={sortOptions.sortingMode === 0}
        onClick={() =>
          dispatchFetchPosts({
            type: 'APPLY_SORT',
            sortOptions: {
              ...sortOptions,
              sortingMode: 0,
            },
          })
        }
      >
        Most recent
      </RadioButton>

      <Input value={query} onChange={onQueryChange} placeholder="Search" />

      {allTags.map(({ id, name }) => (
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
