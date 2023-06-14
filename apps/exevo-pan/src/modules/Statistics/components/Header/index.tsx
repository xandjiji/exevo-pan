import { useTranslations } from 'contexts/useTranslation'
import { memo } from 'react'
import { SubHeader } from 'templates'
import { routes } from 'Constants'
import { ChartsIcon, TrophyIcon } from 'assets/svgs'

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
  ]

  return <SubHeader navItems={navItems} />
}

export default memo(Header)
