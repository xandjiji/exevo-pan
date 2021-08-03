import { Route, Switch } from 'react-router-dom'
import routes from '../../routes'
import * as S from './styles'

const MasterLayout = (): JSX.Element => {
  return (
    <S.Main>
      {/* @ ToDo: Header */}
      <Switch>
        {routes.map(route => (
          <Route {...route} key={route.key} />
        ))}
      </Switch>
    </S.Main>
  )
}

export default MasterLayout
