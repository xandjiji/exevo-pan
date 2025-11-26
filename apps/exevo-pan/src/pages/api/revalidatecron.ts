import { NextApiRequest, NextApiResponse } from 'next'
import { locales } from 'Constants'

const { ALL_LOCALES, DEFAULT_LOCALE } = locales

const addLocalePrefix = (locale: RegisteredLocale): string =>
  locale === DEFAULT_LOCALE ? '' : `/${locale}`

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  const authHeader = request.headers.authorization
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    response.status(401).json({ message: 'Invalid token' })
    return
  }

  const route = '/'
  const revalidateRoute = async (locale: RegisteredLocale): Promise<void> => {
    let routeToRevalidate = decodeURIComponent(
      `${addLocalePrefix(locale)}/${route}`.replaceAll('//', '/'),
    )

    const lastCharacter = routeToRevalidate.slice(-1)
    if (lastCharacter === '/' && routeToRevalidate.length > 1) {
      routeToRevalidate = routeToRevalidate.slice(0, -1)
    }
    response.revalidate(routeToRevalidate)
  }

  try {
    await Promise.all(ALL_LOCALES.map(revalidateRoute))
    response.json({ revalidated: true })
  } catch (error) {
    response.status(500).json({ error })
  }
}
