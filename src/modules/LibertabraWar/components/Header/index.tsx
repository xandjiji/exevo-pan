import { SubHeader } from 'templates'
import { routes } from 'Constants'
import OverallIcon from 'assets/svgs/charts.svg'
import HighscoresIcon from 'assets/svgs/trophy.svg'

const navItems = [
  { title: 'Overall', href: routes.LIBERTABRA_WAR, icon: <OverallIcon /> },
  {
    title: 'Top 10',
    href: routes.LIBERTABRA_WAR_TOP_10,
    icon: <HighscoresIcon />,
  },
]

const Header = (): JSX.Element => <SubHeader navItems={navItems} />

export default Header
