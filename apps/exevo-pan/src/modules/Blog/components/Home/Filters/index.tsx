import { useState, useCallback } from 'react'
import { Accordion, Switch, Input, Tag } from 'components/Atoms'
import { useTranslations } from 'contexts/useTranslation'
import { blogTags } from 'Constants'
import { SearchIcon } from 'assets/svgs'
import { blurOnEnter } from 'utils'
import { useFetchPosts } from '../../../contexts/useFetchPosts'
import useDebouncedFilter from './useDebouncedFilter'

const GroupWrapper = (args: JSX.IntrinsicElements['div']) => (
  <div className="grid gap-2" {...args} />
)

const Filters = () => {
  const { blog } = useTranslations()
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
        <h2 className="text-onSurface flex w-full items-center gap-2 text-2xl font-light">
          <SearchIcon className="fill-onSurface h-6 w-6" />
          {blog.Filters.title}
        </h2>
      }
    >
      <section className="grid max-w-[200px] shrink-0 gap-4 pt-4">
        <GroupWrapper>
          <Switch
            className="font-light tracking-wide"
            style={{ fontSize: 12 }}
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
          </Switch>
        </GroupWrapper>

        <GroupWrapper>
          <Input
            id="query-input"
            label={blog.Filters.searchLabel}
            value={query}
            onChange={onQueryChange}
            placeholder={blog.Filters.searchPlaceholder}
            allowClear
            onKeyPress={blurOnEnter}
            enterKeyHint="search"
          />
        </GroupWrapper>

        <GroupWrapper>
          <p className="text-tsm block font-light tracking-wide">
            {blog.Filters.tagsLabel}
          </p>
          <div className="flex flex-wrap gap-2">
            {blogTags.all.map(({ id }) => (
              <Tag
                key={id}
                tagId={id}
                clickable
                active={activeTags.has(id)}
                onClick={() => toggleTag(id)}
              />
            ))}
          </div>
        </GroupWrapper>
      </section>
    </Accordion>
  )
}

export default Filters
