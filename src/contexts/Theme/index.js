import React, { useState, useCallback, useEffect } from 'react';
import ThemeContext from './context';

export default ({ children }) => {

    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light-theme');

    const toggleTheme = useCallback(() => {
        setTheme((prevTheme) => {
            const newValue = prevTheme === 'light-theme' ? 'dark-theme' : 'light-theme';
            localStorage.setItem('theme', newValue);

            return newValue;
        });
    }, []);

    useEffect(() => {
        const primaryColor = (theme === 'light-theme' ? '#3F51B5' : '#9857E7');
        let addressBar;
        addressBar = document.querySelector('meta[name=theme-color]');
        addressBar.setAttribute('content', primaryColor);
        addressBar = document.querySelector('meta[name=msapplication-navbutton-color]')
        addressBar.setAttribute('content', primaryColor);
    }, [theme]);

    return (
        <ThemeContext.Provider
            value={{
                theme,
                toggleTheme
            }}
        >
            {children}
        </ThemeContext.Provider>
    )
}