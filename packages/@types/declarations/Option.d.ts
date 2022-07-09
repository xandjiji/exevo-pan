declare interface Option {
  name: string
  value: string
}

declare type TypedOption<T> = {
  value: T
} & Omit<Option, 'value'>
