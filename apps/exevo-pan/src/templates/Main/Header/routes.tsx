import { routes } from 'Constants'
import Market from 'assets/svgs/market.svg'
import History from 'assets/svgs/history.svg'
import Calculators from 'assets/svgs/calculator.svg'
import Statistics from 'assets/svgs/statistics.svg'
import Advertise from 'assets/svgs/advertise.svg'
/* import WarIconSvg from 'assets/svgs/war.svg' */
import Blog from 'assets/svgs/blog.svg'
import About from 'assets/svgs/about.svg'
import { NavItem } from './types'

export const NavItems: NavItem[] = [
  {
    href: routes.HOME,
    exact: true,
    icon: <Market />,
    title: 'currentAuctions',
  },
  {
    href: routes.BAZAAR_HISTORY,
    icon: <History />,
    title: 'bazaarHistory',
  },
  {
    href: routes.CALCULATORS,
    icon: <Calculators />,
    /* @ ToDo: add correct title */
    title: 'statistics',
  },
  {
    href: routes.STATISTICS,
    icon: <Statistics />,
    title: 'statistics',
  },
  /* {
      href: routes.LIBERTABRA_WAR,
      icon: <S.WarIcon />,
      title: 'Libertabra War',
    }, */
  {
    href: routes.ADVERTISE,
    icon: <Advertise />,
    title: 'advertise',
  },
  {
    href: routes.BLOG,
    icon: <Blog />,
    title: 'blog',
  },
  {
    href: routes.ABOUT,
    icon: <About />,
    title: 'about',
  },
]
