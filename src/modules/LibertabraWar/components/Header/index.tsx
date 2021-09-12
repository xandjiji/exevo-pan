import { useTranslation } from 'next-i18next'
import { SubHeader } from 'templates'
import { routes } from 'Constants'
import OverallIcon from 'assets/svgs/charts.svg'
import HighscoresIcon from 'assets/svgs/trophy.svg'
import GuildXPIcon from 'assets/svgs/group.svg'
import SearchMembersIcon from 'assets/svgs/search.svg'

const Header = (): JSX.Element => {
  const { t } = useTranslation('war')

  const navItems = [
    {
      title: t('Header.Overall'),
      href: routes.LIBERTABRA_WAR,
      icon: <OverallIcon />,
    },
    {
      title: t('Header.Top10'),
      href: routes.LIBERTABRA_WAR_TOP_10,
      icon: <HighscoresIcon />,
    },
    {
      title: t('Header.GuildXP'),
      href: routes.LIBERTABRA_WAR_GUILD_XP,
      icon: <GuildXPIcon />,
    },
    {
      title: t('Header.Search'),
      href: routes.LIBERTABRA_WAR_SEARCH,
      icon: <SearchMembersIcon />,
    },
  ]

  return <SubHeader navItems={navItems} />
}

export default Header
