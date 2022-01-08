import { useTranslations } from 'contexts/useTranslation'
import { SubHeader } from 'templates'
import { routes } from 'Constants'
import OverallIcon from 'assets/svgs/charts.svg'
import HighscoresIcon from 'assets/svgs/trophy.svg'
import GuildXPIcon from 'assets/svgs/group.svg'
import SearchMembersIcon from 'assets/svgs/search.svg'

const Header = (): JSX.Element => {
  const {
    translations: { war },
  } = useTranslations()

  const navItems = [
    {
      title: war.Header.Overall,
      href: routes.LIBERTABRA_WAR,
      icon: <OverallIcon />,
    },
    {
      title: war.Header.Top10,
      href: routes.LIBERTABRA_WAR_TOP_10,
      icon: <HighscoresIcon />,
    },
    {
      title: war.Header.GuildXP,
      href: routes.LIBERTABRA_WAR_GUILD_XP,
      icon: <GuildXPIcon />,
    },
    {
      title: war.Header.Search,
      href: routes.LIBERTABRA_WAR_SEARCH,
      icon: <SearchMembersIcon />,
    },
  ]

  return <SubHeader navItems={navItems} />
}

export default Header
