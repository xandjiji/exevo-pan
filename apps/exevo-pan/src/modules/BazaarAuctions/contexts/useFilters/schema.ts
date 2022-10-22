import { DEFAULT_FILTER_OPTIONS } from 'shared-utils/dist/contracts/Filters/defaults'
import { SchemaCodec, codecs } from 'hooks/useUrlParamsState'

export const schema: SchemaCodec<FilterOptions> = {
  auctionIds: {
    urlKey: 'auctionIds',
    defaultValue: DEFAULT_FILTER_OPTIONS.auctionIds,
    encode: codecs.encode.NumberSet,
    decode: codecs.decode.NumberSet,
  },
}
