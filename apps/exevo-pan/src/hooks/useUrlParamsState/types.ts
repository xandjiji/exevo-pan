export type PropertyCodec<ValueType> = {
  urlKey: string
  defaultValue: ValueType
  encode?: (decoded: ValueType) => string
  decode?: (encoded: string) => ValueType
}

export type SchemaCodec<Schema> = {
  [Property in keyof Schema]: PropertyCodec<Schema[Property]>
}

export type UrlParameterStateMethods<Type> = {
  get: {
    defaultValues: () => Type
    urlValues: () => Type
  }
  set: {
    urlValues: (newValues: Partial<Type>) => void
  }
  isCurrentlyDefaultValues: () => boolean
  defaultValues: Type
}
