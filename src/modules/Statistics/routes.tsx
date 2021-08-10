import { routes } from 'Constants'
import OverallGrid from './components/OverallGrid'
import HighscoresGrid from './components/HighscoresGrid'

export default [
  {
    key: 'Overall',
    path: routes.STATISTICS,
    exact: true,
    component: OverallGrid,
  },
  {
    key: 'Highscores',
    path: routes.HIGHSCORES,
    exact: true,
    component: HighscoresGrid,
  },
]
