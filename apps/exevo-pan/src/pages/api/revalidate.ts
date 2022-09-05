/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable import/no-extraneous-dependencies */
import { VercelRequest, VercelResponse } from '@vercel/node'
import { locales } from 'Constants'

const { ALL_LOCALES, DEFAULT_LOCALE } = locales

const addLocalePrefix = (locale: RegisteredLocale): string =>
  locale === DEFAULT_LOCALE ? '' : `/${locale}`

export default async (
  request: VercelRequest,
  response: VercelResponse,
): Promise<void> => {
  const { secret } = request.query
  const auth = [process.env.REVALIDATION_AUTH, process.env.BACKOFFICE_TOKEN]

  if (!auth.find((key) => key === secret)) {
    response.status(401).json({ message: 'Invalid token' })
    return
  }

  const route = request.query.route ?? ''
  const revalidateRoute = async (locale: RegisteredLocale): Promise<void> =>
    // @ts-ignore
    response.unstable_revalidate(`${addLocalePrefix(locale)}/${route}`)

  try {
    await Promise.all(ALL_LOCALES.map(revalidateRoute))
    response.json({ revalidated: true })
  } catch (error) {
    response.status(500).json({ error })
  }
}
