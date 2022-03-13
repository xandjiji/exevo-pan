/* eslint-disable import/no-mutable-exports */
import Http from './httpClient'
import Raw from './rawClient'

let HttpClient: typeof Http

if (process.env.RAW) {
  HttpClient = Raw as unknown as typeof Http
} else {
  HttpClient = Http
}

export default HttpClient
