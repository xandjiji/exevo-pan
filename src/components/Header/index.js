import React from 'react';
import Header, { HeaderItem } from './Header.styled';
import { NavLink } from 'react-router-dom';

export default () => {

    return (
        <Header className="inner-container custom-scrollbar">
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