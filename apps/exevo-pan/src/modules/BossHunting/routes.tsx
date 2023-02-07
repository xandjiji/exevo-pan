import { useMemo } from 'react'
import { useTranslations } from 'contexts/useTranslation'
import type { NavItem } from 'templates'
import { routes as ROUTES } from 'Constants'
import { WeightIcon } from 'assets/svgs'

type BossRoute = NavItem & { hero: string }

export const useRoutes = (): BossRoute[] =>
  useMemo(() => {
    /* const {} = useTranslations() */
    console.log(9)

    return [
      {
        title: 'Tracker',
        href: ROUTES.BOSSES.TRACKER,
        icon: <WeightIcon />,
        hero: `${ROUTES.CALCULATORS}/exercise-weapons-hero.png`,
      },
      {
        title: 'Guilds',
        href: ROUTES.BOSSES.GUILDS,
        icon: <WeightIcon />,
        hero: `${ROUTES.CALCULATORS}/exercise-weapons-hero.png`,
      },
    ]
  }, [])
