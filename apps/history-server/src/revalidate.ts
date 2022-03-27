import fetch from 'node-fetch'

const token = process.env.REVALIDATION_AUTH
const REQUEST_TIMEOUT = 15000
const ENDPOINT = 'https://exevopan.com/api/revalidate'

export const revalidate = () =>
  fetch(`${ENDPOINT}?secret=${token}&route=bazaar-history`, {
    timeout: REQUEST_TIMEOUT,
  })
