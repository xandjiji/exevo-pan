import { SchemaCodec } from 'shared-utils/dist/urlSerializer'

export type UseSynchUrlParamsStateProps<T> = {
  schemaCodec: SchemaCodec<T>
  currentState: T
}
