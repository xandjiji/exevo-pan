import { DEFAULT_SERIALIZED_FILTER_OPTIONS } from './defaults'

export const serializeBody = ({
  paginationOptions,
  sortOptions,
  filterOptions,
}: BlogFilterBodyPayload): string => {
  const serializedFilterState: SerializedBlogFilterOptions = {
    ...filterOptions,
    tags: [...filterOptions.tags],
  }

  return JSON.stringify({
    paginationOptions,
    sortOptions,
    filterOptions: serializedFilterState,
  })
}

const deserializeFilterOptions = ({
  tags,
  ...primitiveOptions
}: SerializedBlogFilterOptions): BlogFilterOptions => ({
  ...primitiveOptions,
  tags: new Set<string>(tags),
})

export const deserializeBody = ({
  paginationOptions,
  sortOptions,
  filterOptions,
}: SerializedBlogFilterBody): BlogFilterBodyPayload => ({
  paginationOptions,
  sortOptions,
  filterOptions: deserializeFilterOptions(
    filterOptions ?? DEFAULT_SERIALIZED_FILTER_OPTIONS,
  ),
})
