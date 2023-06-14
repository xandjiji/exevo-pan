import { useTranslations } from 'contexts/useTranslation'
import { SubHeader } from 'templates'
import { routes } from 'Constants'
import { ChartsIcon, TrophyIcon, GroupIcon, SearchIcon } from 'assets/svgs'

const Header = () => {
  const { war } = useTranslations()

  const navItems = [
    {
      title: war.Header.Overall,
      href: routes.LIBERTABRA_WAR,
      icon: <ChartsIcon />,
    },
    {
      title: war.Header.Top10,
      href: routes.LIBERTABRA_WAR_TOP_10,
      icon: <TrophyIcon />,
    },
    {
      title: war.Header.GuildXP,
      href: routes.LIBERTABRA_WAR_GUILD_XP,
      icon: <GroupIcon />,
    },
    {
      title: war.Header.Search,
      href: routes.LIBERTABRA_WAR_SEARCH,
      icon: <SearchIcon />,
    },
  ]

  return <SubHeader navItems={navItems} />
}

export default Header
