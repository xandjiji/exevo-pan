declare type KeysOfType<T, V> = {
  [K in keyof T]: T[K] extends V ? K : never
}[keyof T]

declare type FilterProperties<T, V> = Pick<T, KeysOfType<T, V>>
