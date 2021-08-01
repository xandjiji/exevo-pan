import React, { useContext } from 'react';
import Header, { HeaderWrapper, HeaderItem, Logo } from './Header.styled';
import { NavLink } from 'react-router-dom';
import { CtaButton, Switch } from 'components/Atoms/';
import { routes } from 'Constants'

import logo from '../../assets/logo.png';
import { ReactComponent as MoonIcon } from '../../assets/svgs/moon.svg';

import { useTheme } from 'contexts/useTheme';

export default () => {

    const { currentTheme, toggleTheme } = useTheme();

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
                                to={routes.HOME}
                                exact
                                className="clickable"
                                activeClassName="active"
                            >
                                Current Auctions
                            </NavLink>
                        </HeaderItem>

                        <HeaderItem>
                            <NavLink
                                to={routes.BAZAAR_HISTORY}
                                exact
                                className="clickable"
                                activeClassName="active"
                            >
                                Bazaar History
                            </NavLink>
                        </HeaderItem>

                        <HeaderItem>
                            <NavLink
                                to={routes.STATISTICS}
                                exact
                                className="clickable"
                                activeClassName="active"
                            >
                                Statistics
                            </NavLink>
                        </HeaderItem>
                    </ul>
                </nav>
            </HeaderWrapper>

            <HeaderWrapper>
                <Switch
                    active={currentTheme === 'dark-theme'}
                    onClick={toggleTheme}
                    icon={<MoonIcon />}
                    aria-label="Toggle dark theme"
                />
                <CtaButton />
            </HeaderWrapper>
        </Header>
    )
}