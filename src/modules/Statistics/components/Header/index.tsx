import { useTranslations } from 'contexts/useTranslation'
import { memo } from 'react'
import { SubHeader } from 'templates'
import { routes } from 'Constants'
import OverallIcon from 'assets/svgs/charts.svg'
import HighscoresIcon from 'assets/svgs/trophy.svg'

const Header = (): JSX.Element => {
  const {
    translations: { statistics },
  } = useTranslations()

  const navItems = [
    {
      title: statistics.Header.Overall,
      href: routes.STATISTICS,
      icon: <OverallIcon />,
    },
    {
      title: statistics.Header.Highscores,
      href: routes.HIGHSCORES,
      icon: <HighscoresIcon />,
    },
  ]

  return <SubHeader navItems={navItems} />
}

export default memo(Header)
