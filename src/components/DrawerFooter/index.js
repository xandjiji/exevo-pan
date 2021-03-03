import React, { useContext } from 'react';
import DrawerFooter from './DrawerFooter.styled';

import Switch from '../Switch';
import ThemeContext from '../../contexts/Theme/context';

import { ReactComponent as GithubIcon } from '../../assets/svgs/github.svg';
import { ReactComponent as MoonIcon } from '../../assets/svgs/moon.svg';

export default () => {
    const { theme, toggleTheme } = useContext(ThemeContext);

    return (
        <DrawerFooter className="inner-container">
            <div className="left-wrapper">
                <a className="gitrepo" href="https://github.com/xandjiji/exevo-pan" target="_blank" rel="noreferrer">
                    <GithubIcon className="clickable" />
                Go to this repository
            </a>
            made by <a className="gituser" href="https://github.com/xandjiji" target="_blank" rel="noreferrer">xandjiji</a>
            </div>

            <Switch
                active={theme === 'dark-theme'}
                onClick={toggleTheme}
                icon={<MoonIcon />}
            />
        </DrawerFooter>
    )
}