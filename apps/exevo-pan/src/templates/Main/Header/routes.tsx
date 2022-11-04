import { routes } from 'Constants'
import {
  MarketIcon,
  HistoryIcon,
  CalculatorIcon,
  StatisticsIcon,
  AdvertiseIcon,
  BlogIcon,
  AboutIcon,
  GoblinIcon,
} from 'assets/svgs'
import { NavItem } from './types'

export const NavItems: NavItem[] = [
  {
    href: routes.HOME,
    exact: true,
    icon: <MarketIcon />,
    title: 'currentAuctions',
  },
  {
    href: routes.BAZAAR_HISTORY,
    icon: <HistoryIcon />,
    title: 'bazaarHistory',
  },
  {
    href: routes.BOSS_TRACKER,
    icon: <GoblinIcon />,
    title: 'bossTracker',
  },
  {
    href: routes.CALCULATORS,
    icon: <CalculatorIcon />,
    title: 'calculators',
  },
  {
    href: routes.STATISTICS,
    icon: <StatisticsIcon />,
    title: 'statistics',
  },
  {
    href: routes.ADVERTISE,
    icon: <AdvertiseIcon />,
    title: 'advertise',
  },
  {
    href: routes.BLOG,
    icon: <BlogIcon />,
    title: 'blog',
  },
  {
    href: routes.ABOUT,
    icon: <AboutIcon />,
    title: 'about',
  },
]
