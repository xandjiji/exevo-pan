import { useTranslation } from 'next-i18next'
import { memo } from 'react'
import { SubHeader } from 'templates'
import { routes } from 'Constants'
import OverallIcon from 'assets/svgs/charts.svg'
import HighscoresIcon from 'assets/svgs/trophy.svg'

const Header = (): JSX.Element => {
  const { t } = useTranslation('statistics')

  const navItems = [
    {
      title: t('Header.Overall'),
      href: routes.STATISTICS,
      icon: <OverallIcon />,
    },
    {
      title: t('Header.Highscores'),
      href: routes.HIGHSCORES,
      icon: <HighscoresIcon />,
    },
  ]

  return <SubHeader navItems={navItems} />
}

export default memo(Header)
