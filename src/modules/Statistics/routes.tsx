import { routes } from 'Constants'

const Test = (): JSX.Element => <h1>a</h1>
const Test2 = (): JSX.Element => <h1>b</h1>

export default [
  {
    key: 'Overall',
    path: routes.STATISTICS,
    exact: true,
    component: Test,
  },
  {
    key: 'Highscores',
    path: routes.HIGHSCORES,
    exact: true,
    component: Test2,
  },
]
