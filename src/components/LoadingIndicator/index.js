import React, { useContext } from 'react';
import LoadingIndicator from './LoadingIndicator.styled';
import ThemeContext from '../..//contexts/Theme/context';

export default ({ children }) => {
    const { theme } = useContext(ThemeContext);

    return (
        <LoadingIndicator className={`shadow ${theme}`}>
            <div className="data-loader"></div>
            {children}
        </LoadingIndicator>
    )
};