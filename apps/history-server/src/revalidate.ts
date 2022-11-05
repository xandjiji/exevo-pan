import fetch from 'node-fetch'
import { broadcast } from 'logging'
import { config } from 'dotenv'

const REQUEST_TIMEOUT = 15000
const ENDPOINT = 'https://exevopan.com/api/revalidate'

export const revalidate = async () => {
  config()
  const token = process.env.REVALIDATION_AUTH
  console.log(token)
  console.log(token)
  console.log(token)

  if (!token) {
    throw new Error(
      'Invalid token! Add `export REVALIDATION_AUTH="cf943cab-a1d2-4447-a0c5-bd910aaac4d2"` to `.env`',
    )
  }

  const { status } = await fetch(
    `${ENDPOINT}?secret=${token}&route=bazaar-history`,
    {
      timeout: REQUEST_TIMEOUT,
    },
  )

  if (status === 401) {
    broadcast('Unauthorized revalidation token', 'fail')
    throw new Error()
  }
}
