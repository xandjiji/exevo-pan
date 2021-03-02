import React, { useState, useCallback } from 'react';
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