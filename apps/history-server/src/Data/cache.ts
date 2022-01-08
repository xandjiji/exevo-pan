type CacheObject = Record<string, CharacterObject[]>

export default class Cache {
  static cache: CacheObject = {}

  static sortCache: CacheObject = {}

  static serialize<T>(object: T): string {
    const key = JSON.stringify(object)
    return key
  }

  static getSortCache(options: SortOptions): CharacterObject[] | undefined {
    const key = this.serialize(options)
    return this.sortCache[key]
  }

  static setSortCache(options: SortOptions, data: CharacterObject[]): void {
    const key = this.serialize(options)
    this.sortCache[key] = data
  }

  static buildFilterKey(
    serializedFilters: SerializedFilterOptions,
    sortOptions: SortOptions,
  ): string {
    const filtersKey = this.serialize(serializedFilters)
    const sortKey = this.serialize(sortOptions)
    return `${filtersKey}-${sortKey}`
  }

  static getFilterCache(
    serializedFilters: SerializedFilterOptions,
    sortOptions: SortOptions,
  ): CharacterObject[] | undefined {
    return this.cache[this.buildFilterKey(serializedFilters, sortOptions)]
  }

  static setFilterCache(
    serializedFilters: SerializedFilterOptions,
    sortOptions: SortOptions,
    data: CharacterObject[],
  ): void {
    const key = this.buildFilterKey(serializedFilters, sortOptions)
    this.cache[key] = data
  }
}
