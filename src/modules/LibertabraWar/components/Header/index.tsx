import { SubHeader } from 'templates'
import { routes } from 'Constants'
import OverallIcon from 'assets/svgs/charts.svg'
import HighscoresIcon from 'assets/svgs/trophy.svg'
import GuildXPIcon from 'assets/svgs/group.svg'
import SearchMembersIcon from 'assets/svgs/search.svg'

const navItems = [
  { title: 'Overall', href: routes.LIBERTABRA_WAR, icon: <OverallIcon /> },
  {
    title: 'Top 10',
    href: routes.LIBERTABRA_WAR_TOP_10,
    icon: <HighscoresIcon />,
  },
  {
    title: 'Guild XP',
    href: routes.LIBERTABRA_WAR_GUILD_XP,
    icon: <GuildXPIcon />,
  },
  {
    title: 'Search Members',
    href: routes.LIBERTABRA_WAR_SEARCH,
    icon: <SearchMembersIcon />,
  },
]

const Header = (): JSX.Element => <SubHeader navItems={navItems} />

export default Header
