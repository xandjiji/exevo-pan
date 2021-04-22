import React, { useContext } from 'react';
import { Route, Switch } from 'react-router-dom';
import Header from '../components/Header';
import ThemeContext from '../contexts/Theme/context';

import CharGridSwitcher from '../Routes/CharGridSwitcher';
import SideDrawerSwitcher from '../Routes/SideDrawerSwitcher';

import StatisticsGrid from '../components/StatisticsGrid';

import ErrorPage from '../components/ErrorPage';

import '../layouts/common.css';

const MasterLayout = () => {
    const { theme } = useContext(ThemeContext);

    return (
        <div className={`body-container ${theme}`}>
            <Switch>
                <Route exact path={["/", "/bazaar-history"]}>
                    <Header />
                    <CharGridSwitcher />
                    <SideDrawerSwitcher />
                </Route>

                <Route exact path="/statistics">
                    <Header />
                    <StatisticsGrid />
                </Route>

                <Route>
                    <ErrorPage mainMessage="404" paragraphs={['oops!', 'page not found']}/>
                </Route>
            </Switch>
        </div>
    );
}

export default MasterLayout;