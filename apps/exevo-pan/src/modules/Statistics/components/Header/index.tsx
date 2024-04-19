import { useTranslations } from 'contexts/useTranslation'
import { memo } from 'react'
import { SubHeader } from 'templates'
import { routes } from 'Constants'
import { ChartsIcon, TrendingIcon, TrophyIcon } from 'assets/svgs'

const Header = () => {
  const { statistics } = useTranslations()

  const navItems = [
    {
      title: statistics.Header.Overall,
      href: routes.STATISTICS,
      icon: <ChartsIcon />,
    },
    {
      title: statistics.Header.Highscores,
      href: routes.HIGHSCORES,
      icon: <TrophyIcon />,
    },
    {
      title: 'Valor mediano de leilões',
      href: routes.MEDIAN_AUCTIONS_VALUE,
      icon: <TrendingIcon />,
    },
  ]

  return <SubHeader navItems={navItems} />
}

export default memo(Header)
