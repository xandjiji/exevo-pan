import { useCallback } from 'react'
import { blogTags } from 'Constants'
import { useFetchPosts } from '../../../contexts/useFetchPosts'
import useDebouncedFilter from './useDebouncedFilter'
import { Tag } from '../..'
import * as S from './styles'

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
      <S.Title>Filter posts</S.Title>

      <S.GroupWrapper>
        <S.Switch
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
          Most recent
        </S.Switch>
      </S.GroupWrapper>

      <S.GroupWrapper>
        <S.Label htmlFor="query-input">Blog search</S.Label>
        <S.Input
          id="query-input"
          value={query}
          onChange={onQueryChange}
          placeholder="Search for posts"
          allowClear
        />
      </S.GroupWrapper>

      <S.GroupWrapper>
        <S.Label as="p">Tags</S.Label>
        <S.TagWrapper>
          {blogTags.map(({ id, name, color }) => (
            <Tag
              key={id}
              clickable
              active={filterOptions.tags.has(id)}
              onClick={() =>
                dispatchFetchPosts({ type: 'TOGGLE_TAG', tag: id })
              }
              tagColor={color}
            >
              {name}
            </Tag>
          ))}
        </S.TagWrapper>
      </S.GroupWrapper>
    </S.Wrapper>
  )
}

export default Filters
