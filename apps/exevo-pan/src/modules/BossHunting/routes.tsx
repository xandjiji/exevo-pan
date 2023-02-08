import { useMemo } from 'react'
import { useTranslations } from 'contexts/useTranslation'
import type { NavItem } from 'templates'
import { routes as ROUTES } from 'Constants'
import { GpsIcon, GroupIcon } from 'assets/svgs'

export const useRoutes = (): NavItem[] => {
  const {
    translations: { bosses },
  } = useTranslations()

  return useMemo(
    () => [
      {
        title: bosses.Header.bossTracker,
        href: ROUTES.BOSSES.TRACKER,
        icon: <GpsIcon />,
      },
      {
        title: bosses.Header.huntingGroups,
        href: ROUTES.BOSSES.GUILDS,
        icon: <GroupIcon />,
      },
    ],
    [bosses],
  )
}
