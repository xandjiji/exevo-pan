import React, { useContext, useEffect } from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';
import Header from '../components/Header';
import { useTheme } from 'contexts/useTheme';
import CharGridSwitcher from '../Routes/CharGridSwitcher';
import SideDrawerSwitcher from '../Routes/SideDrawerSwitcher';

import StatisticsGrid from '../components/StatisticsGrid';

import ErrorPage from '../components/ErrorPage';

const pageTitle = {
    '/': 'Exevo Pan - Current Auctions',
    '/bazaar-history': 'Exevo Pan - Bazaar History',
    '/statistics': 'Exevo Pan - Statistics'
}

const MasterLayout = () => {
    const { currentTheme } = useTheme()
    const { pathname } = useLocation()
    useEffect(() => {
        document.title = pageTitle[pathname] || 'Exevo Pan';
    }, [pathname]);

    return (
        <div className={`body-container ${currentTheme}`}>
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