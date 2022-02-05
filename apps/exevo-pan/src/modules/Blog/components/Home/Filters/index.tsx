import { useState, useCallback } from 'react'
import { Accordion, Input } from 'components/Atoms'
import Tag from 'components/Tag'
import { useTranslations } from 'contexts/useTranslation'
import { blogTags } from 'Constants'
import { useFetchPosts } from '../../../contexts/useFetchPosts'
import useDebouncedFilter from './useDebouncedFilter'
import * as S from './styles'

const Filters = (): JSX.Element => {
  const {
    translations: { blog },
  } = useTranslations()
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

  const [activeTags, setActiveTags] = useState(filterOptions.tags)
  const toggleTag = useCallback(
    (toggledTag: string) =>
      setActiveTags((prevTags) => {
        const newTags = new Set(prevTags)

        if (prevTags.has(toggledTag)) {
          newTags.delete(toggledTag)
        } else {
          newTags.add(toggledTag)
        }
        dispatchFetchPosts({
          type: 'APPLY_FILTERS',
          filterOptions: { tags: newTags },
        })
        return newTags
      }),
    [],
  )

  return (
    <Accordion
      border
      title={
        <S.Title>
          <S.Icon />
          {blog.Filters.title}
        </S.Title>
      }
    >
      <S.Wrapper>
        <S.GroupWrapper>
          <S.Switch
            active={sortOptions.descendingOrder}
            onClick={() =>
              dispatchFetchPosts({
                type: 'APPLY_FILTERS',
                sortOptions: {
                  descendingOrder: !sortOptions.descendingOrder,
                },
              })
            }
          >
            {blog.Filters.mostRecentLabel}
          </S.Switch>
        </S.GroupWrapper>

        <S.GroupWrapper>
          <S.Label htmlFor="query-input">{blog.Filters.searchLabel}</S.Label>
          <Input
            id="query-input"
            value={query}
            onChange={onQueryChange}
            placeholder={blog.Filters.searchPlaceholder}
            allowClear
            hasAlert={false}
          />
        </S.GroupWrapper>

        <S.GroupWrapper>
          <S.Label as="p">{blog.Filters.tagsLabel}</S.Label>
          <S.TagWrapper>
            {blogTags.all.map(({ id }) => (
              <Tag
                key={id}
                tagId={id}
                clickable
                active={activeTags.has(id)}
                onClick={() => toggleTag(id)}
              />
            ))}
          </S.TagWrapper>
        </S.GroupWrapper>
      </S.Wrapper>
    </Accordion>
  )
}

export default Filters
