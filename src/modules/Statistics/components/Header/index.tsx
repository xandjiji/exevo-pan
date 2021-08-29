import { SubHeader } from 'templates'
import { routes } from 'Constants'
import OverallIcon from 'assets/svgs/charts.svg'
import HighscoresIcon from 'assets/svgs/trophy.svg'

const navItems = [
  { title: 'Overall', href: routes.STATISTICS, icon: <OverallIcon /> },
  { title: 'Highscores', href: routes.HIGHSCORES, icon: <HighscoresIcon /> },
]

const Header = (): JSX.Element => <SubHeader navItems={navItems} />

export default Header
