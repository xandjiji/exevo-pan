import React, { useContext } from 'react';
import ThemeContext from '../contexts/Theme/context';
import '../layouts/common.css';

const MasterLayout = ({ children }) => {
    const { theme } = useContext(ThemeContext);

    return (
        <div className={`body-container ${theme}`}>
            {children}
        </div>
    );
}

export default MasterLayout;