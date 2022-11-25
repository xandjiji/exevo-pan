import { SchemaCodec, codecs, buildFromSchema } from '../../../urlSerializer'
import { DEFAULT_SORT_OPTIONS } from '../defaults'

export const sortSchema: SchemaCodec<SortOptions> = {
  sortingMode: {
    urlKey: 'orderBy',
    defaultValue: DEFAULT_SORT_OPTIONS.sortingMode,
    decode: codecs.decode.Number,
  },
  descendingOrder: {
    urlKey: 'descending',
    defaultValue: DEFAULT_SORT_OPTIONS.descendingOrder,
    decode: codecs.decode.Boolean,
  },
}

export const serializeSort = buildFromSchema.serializer(sortSchema)

export const deserializeSort = buildFromSchema.deserializer(sortSchema)
