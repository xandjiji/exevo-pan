import { SchemaCodec, codecs, buildFromSchema } from '../../../urlSerializer'
import { DEFAULT_PAGINATION_OPTIONS } from '../defaults'

export const paginationSchema: SchemaCodec<PaginationOptions> = {
  pageIndex: {
    urlKey: 'currentPage',
    defaultValue: DEFAULT_PAGINATION_OPTIONS.pageIndex,
    decode: codecs.decode.Number,
  },
  pageSize: {
    urlKey: 'pageSize',
    defaultValue: DEFAULT_PAGINATION_OPTIONS.pageSize,
    decode: codecs.decode.Number,
  },
}

export const serializePagination = buildFromSchema.serializer(paginationSchema)

export const deserializePagination =
  buildFromSchema.deserializer(paginationSchema)
