/* eslint-disable no-eval */
import { uneval } from 'devalue'
import superjson from 'superjson'

export const transformer = {
  input: superjson,
  output: {
    serialize: (object: any) => uneval(object),
    deserialize: (object: any) => eval(`(${object})`),
  },
}
