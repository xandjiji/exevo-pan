import { useMemo } from 'react'
import { useTranslations } from 'contexts/useTranslation'
import type { NavItem, NavGridItem } from 'templates'
import { routes as ROUTES } from 'Constants'
import { CalculatorIcon, WeightIcon } from 'assets/svgs'

type BossRoute = NavItem & NavGridItem & { hero: string }

export const useRoutes = (): BossRoute[] =>
  useMemo(() => {
    /* const {} = useTranslations() */
    console.log(9)

    return [
      {
        title: 'Main',
        href: ROUTES.BOSSES.MAIN,
        icon: <CalculatorIcon />,
        hero: '/calculators/calculators-hero.png',
        sprite: '/sprites/bricklayer.gif',
        description: 'Main',
      },
      {
        title: 'Tracker',
        href: ROUTES.BOSSES.TRACKER,
        icon: <WeightIcon />,
        hero: `${ROUTES.CALCULATORS}/exercise-weapons-hero.png`,
        sprite: '/sprites/store/lasting exercise sword.gif',
        description: 'Main',
      },
      {
        title: 'Guilds',
        href: ROUTES.BOSSES.GUILDS,
        icon: <WeightIcon />,
        hero: `${ROUTES.CALCULATORS}/exercise-weapons-hero.png`,
        sprite: '/sprites/store/lasting exercise sword.gif',
        description: 'Main',
      },
    ]
  }, [])
