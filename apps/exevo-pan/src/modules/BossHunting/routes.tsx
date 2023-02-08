import { useMemo } from 'react'
import { useTranslations } from 'contexts/useTranslation'
import type { NavItem } from 'templates'
import { routes as ROUTES } from 'Constants'
import { GpsIcon, GroupIcon } from 'assets/svgs'

type BossRoute = NavItem & { hero: string }

export const useRoutes = (): BossRoute[] => {
  const {
    translations: { bosses },
  } = useTranslations()

  return useMemo(
    () => [
      {
        title: bosses.Header.bossTracker,
        href: ROUTES.BOSSES.TRACKER,
        icon: <GpsIcon />,
        hero: `${ROUTES.CALCULATORS}/exercise-weapons-hero.png`,
      },
      {
        title: bosses.Header.huntingGroups,
        href: ROUTES.BOSSES.GUILDS,
        icon: <GroupIcon />,
        hero: `${ROUTES.CALCULATORS}/exercise-weapons-hero.png`,
      },
    ],
    [bosses],
  )
}
