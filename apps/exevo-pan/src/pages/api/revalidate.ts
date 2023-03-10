import { NextApiRequest, NextApiResponse } from 'next'
import { locales } from 'Constants'

const { ALL_LOCALES, DEFAULT_LOCALE } = locales

const addLocalePrefix = (locale: RegisteredLocale): string =>
  locale === DEFAULT_LOCALE ? '' : `/${locale}`

export default async (
  request: NextApiRequest,
  response: NextApiResponse,
): Promise<void> => {
  const { secret } = request.query
  const auth = [process.env.REVALIDATION_AUTH]

  if (!auth.find((key) => key === secret)) {
    response.status(401).json({ message: 'Invalid token' })
    return
  }

  const route = request.query.route ?? ''
  const revalidateRoute = async (locale: RegisteredLocale): Promise<void> => {
    const routeToRevalidate = `${addLocalePrefix(locale)}/${route}`.replaceAll(
      '//',
      '/',
    )

    response.revalidate(routeToRevalidate)
  }

  try {
    await Promise.all(ALL_LOCALES.map(revalidateRoute))
    response.json({ revalidated: true })
  } catch (error) {
    response.status(500).json({ error })
  }
}
