import { useEffect } from 'react'
import { useRouteMatch, Route, Switch } from 'react-router-dom'
import Header from './components/Header'
import StatisticsGrid from './components/StatisticsGrid'

const Statistics = (): JSX.Element => {
  const { path } = useRouteMatch()

  useEffect(() => {
    document.title = `Exevo Pan - Statistics`
  }, [])

  return (
    <main>
      <Header />
      <Switch>
        <Route path={`${path}`} exact component={StatisticsGrid} />
        <Route path={`${path}/highscores`} exact component={StatisticsGrid} />
      </Switch>
    </main>
  )
}

export default Statistics
