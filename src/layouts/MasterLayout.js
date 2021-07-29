import { Route, Switch } from 'react-router-dom';
import Header from '../components/Header';
import { useTheme } from 'contexts/useTheme';
import routes from '../routes'

const MasterLayout = () => {
    const { currentTheme } = useTheme()
    return (
        <div className={`body-container ${currentTheme}`}>
            <Header />
            <Switch>
                {routes.map(route => (<Route {...route} />))}
            </Switch>
        </div>
    );
}

export default MasterLayout;