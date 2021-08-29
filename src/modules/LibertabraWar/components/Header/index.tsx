import { SubHeader } from 'templates'
import { routes } from 'Constants'
import OverallIcon from 'assets/svgs/charts.svg'

const navItems = [
  { title: 'Overall', href: routes.LIBERTABRA_WAR, icon: <OverallIcon /> },
]

const Header = (): JSX.Element => <SubHeader navItems={navItems} />

export default Header
