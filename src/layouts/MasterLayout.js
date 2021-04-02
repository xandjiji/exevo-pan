import React, { useContext } from 'react';
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
            <CharGridSwitcher />
            <SideDrawerSwitcher />
        </div>
    );
}

export default MasterLayout;