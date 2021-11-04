import { routes } from 'Constants'
import * as S from './styles'
import { NavItem } from './types'

export const NavItems: NavItem[] = [
  {
    href: routes.HOME,
    exact: true,
    icon: <S.MarketIcon />,
    title: 'currentAuctions',
  },
  {
    href: routes.BAZAAR_HISTORY,
    icon: <S.HistoryIcon />,
    title: 'bazaarHistory',
  },
  {
    href: routes.STATISTICS,
    icon: <S.StatisticsIcon />,
    title: 'statistics',
  },
  /* {
      href: routes.LIBERTABRA_WAR,
      icon: <S.WarIcon />,
      title: 'Libertabra War',
    }, */
  {
    href: routes.ADVERTISE,
    icon: <S.AdvertiseIcon />,
    title: 'advertise',
  },
  {
    href: routes.ABOUT,
    icon: <S.AboutIcon />,
    title: 'about',
  },
]
