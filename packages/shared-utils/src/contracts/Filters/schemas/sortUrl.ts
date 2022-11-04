import { SchemaCodec, codecs, buildFromSchema } from '../../../urlSerializer'
import { DEFAULT_SORT_OPTIONS } from '../defaults'

type AuctionMode = keyof typeof DEFAULT_SORT_OPTIONS

export const sortSchema = (
  auctionMode: AuctionMode,
): SchemaCodec<SortOptions> => ({
  sortingMode: {
    urlKey: 'orderBy',
    defaultValue: DEFAULT_SORT_OPTIONS[auctionMode].sortingMode,
    decode: codecs.decode.Number,
  },
  descendingOrder: {
    urlKey: 'descending',
    defaultValue: DEFAULT_SORT_OPTIONS[auctionMode].descendingOrder,
    decode: codecs.decode.Boolean,
  },
})

export const serializeSort = {
  history: buildFromSchema.serializer(sortSchema('history')),
  current: buildFromSchema.serializer(sortSchema('current')),
}

export const deserializeSort = {
  history: buildFromSchema.deserializer(sortSchema('history')),
  current: buildFromSchema.deserializer(sortSchema('current')),
}
