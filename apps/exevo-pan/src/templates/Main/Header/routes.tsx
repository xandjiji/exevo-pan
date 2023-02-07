import { routes } from 'Constants'
import {
  MarketIcon,
  CalculatorIcon,
  StatisticsIcon,
  AdvertiseIcon,
  BlogIcon,
  GoblinIcon,
} from 'assets/svgs'
import { NavItem } from './types'

export const NavItems: NavItem[] = [
  {
    href: routes.HOME,
    exact: true,
    icon: <MarketIcon />,
    title: 'charBazaar',
  },
  {
    href: routes.BOSSES.MAIN,
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
]
