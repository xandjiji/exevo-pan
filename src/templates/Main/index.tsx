import { Route, Switch } from 'react-router-dom'
import routes from '../../routes'
import Header from './Header'
import * as S from './styles'

const MasterLayout = (): JSX.Element => (
  <S.Main>
    <Header />
    <Switch>
      {routes.map(route => (
        <Route {...route} key={route.key} />
      ))}
    </Switch>
  </S.Main>
)

export default MasterLayout
