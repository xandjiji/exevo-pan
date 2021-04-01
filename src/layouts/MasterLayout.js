import React, { useContext } from 'react';
import Header from '../components/Header';
import ThemeContext from '../contexts/Theme/context';
import '../layouts/common.css';

const MasterLayout = ({ children }) => {
    const { theme } = useContext(ThemeContext);

    return (
        <div className={`body-container ${theme}`}>
            <Header />
            {children}
        </div>
    );
}

export default MasterLayout;