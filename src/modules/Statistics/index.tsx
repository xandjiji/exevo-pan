import { useEffect } from 'react'
import { useRouteMatch, Route, Switch } from 'react-router-dom'
import Header from './components/Header'
import OverallGrid from './components/OverallGrid'
import HighscoresGrid from './components/HighscoresGrid'

const Statistics = (): JSX.Element => {
  const { path } = useRouteMatch()

  /* @ ToDo: change title based on subpage */
  useEffect(() => {
    document.title = `Exevo Pan - Statistics`
  }, [])

  return (
    <main>
      <Header />
      <Switch>
        <Route path={`${path}`} exact component={OverallGrid} />
        <Route path={`${path}/highscores`} exact component={HighscoresGrid} />
      </Switch>
    </main>
  )
}

export default Statistics
