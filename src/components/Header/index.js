import React, { useContext } from 'react';
import Header, { HeaderWrapper, HeaderItem, Logo } from './Header.styled';
import { NavLink } from 'react-router-dom';
import { CtaButton, Switch } from '../Atoms/';

import logo from '../../assets/logo.png';
import { ReactComponent as MoonIcon } from '../../assets/svgs/moon.svg';

import UrlParametersContext from '../../contexts/UrlParameters/context';
import ThemeContext from '../../contexts/Theme/context';

export default () => {

    const { theme, toggleTheme } = useContext(ThemeContext);
    const { resetParams } = useContext(UrlParametersContext);

    return (
        <Header className="inner-container custom-scrollbar">
            <HeaderWrapper>
                <Logo
                    src={logo}
                    width={36}
                    height={36}
                    alt="Exevo Pan"
                />
                <nav>
                    <ul>
                        <HeaderItem>
                            <NavLink
                                to="/"
                                exact
                                className="clickable"
                                activeClassName="active"
                                onClick={() => resetParams()}
                            >
                                Current Auctions
                            </NavLink>
                        </HeaderItem>

                        <HeaderItem>
                            <NavLink
                                to="/bazaar-history"
                                exact
                                className="clickable"
                                activeClassName="active"
                                onClick={() => resetParams()}
                            >
                                Bazaar History
                            </NavLink>
                        </HeaderItem>

                        <HeaderItem>
                            <NavLink
                                to="/statistics"
                                exact
                                className="clickable"
                                activeClassName="active"
                                onClick={() => resetParams()}
                            >
                                Statistics
                            </NavLink>
                        </HeaderItem>
                    </ul>
                </nav>
            </HeaderWrapper>

            <HeaderWrapper>
                <Switch
                    active={theme === 'dark-theme'}
                    onClick={toggleTheme}
                    icon={<MoonIcon />}
                />
                <CtaButton />
            </HeaderWrapper>
        </Header>
    )
}