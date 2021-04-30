import React, { useContext, useEffect } from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';
import Header from '../components/Header';
import ThemeContext from '../contexts/Theme/context';

import CharGridSwitcher from '../Routes/CharGridSwitcher';
import SideDrawerSwitcher from '../Routes/SideDrawerSwitcher';

import StatisticsGrid from '../components/StatisticsGrid';

import ErrorPage from '../components/ErrorPage';

import '../layouts/common.css';

const pageTitle = {
    '/': 'Exevo Pan - Current Auctions',
    '/bazaar-history': 'Exevo Pan - Bazaar History',
    '/statistics': 'Exevo Pan - Statistics'
}

const MasterLayout = () => {
    const { theme } = useContext(ThemeContext);

    const { pathname } = useLocation()
    useEffect(() => {
        document.title = pageTitle[pathname] || 'Exevo Pan';
    }, [pathname]);

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
                    <ErrorPage mainMessage="404" paragraphs={['oops!', 'page not found']} />
                </Route>
            </Switch>
        </div>
    );
}

export default MasterLayout;