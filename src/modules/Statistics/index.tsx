import { useEffect } from 'react'
import { Route, Switch } from 'react-router-dom'
import routes from './routes'
import Header from './components/Header'

const Statistics = (): JSX.Element => {
  /* @ ToDo: change title based on subpage */
  useEffect(() => {
    document.title = `Exevo Pan - Statistics`
  }, [])

  return (
    <main>
      <Header />
      <Switch>
        {routes.map(route => (
          <Route {...route} key={route.key} />
        ))}
      </Switch>
    </main>
  )
}

export default Statistics
