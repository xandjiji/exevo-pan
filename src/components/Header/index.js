import React from 'react';
import Header, { HeaderItem, Logo } from './Header.styled';
import { NavLink } from 'react-router-dom';

import logo from '../../assets/logo.png';

export default () => {

    return (
        <Header className="inner-container custom-scrollbar">
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
                        >
                            Bazaar History
                        </NavLink>
                    </HeaderItem>
                </ul>
            </nav>
        </Header>
    )
}