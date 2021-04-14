import React, { useContext } from 'react';
import { Route, Switch } from 'react-router-dom';
import Header from '../components/Header';
import ThemeContext from '../contexts/Theme/context';

import CharGridSwitcher from '../Routes/CharGridSwitcher';
import SideDrawerSwitcher from '../Routes/SideDrawerSwitcher';

import '../layouts/common.css';

const MasterLayout = () => {
    const { theme } = useContext(ThemeContext);

    return (
        <div className={`body-container ${theme}`}>
            <Header />
            <Switch>
                <Route exact path={["/", "/bazaar-history"]}>
                    <CharGridSwitcher />
                    <SideDrawerSwitcher />
                </Route>

                <Route exact path="/statistics">
                    
                </Route>
            </Switch>
        </div>
    );
}

export default MasterLayout;