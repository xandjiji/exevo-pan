import React, { useContext } from 'react';
import Header, { HeaderItem, Logo } from './Header.styled';
import { NavLink } from 'react-router-dom';

import logo from '../../assets/logo.png';

import UrlParametersContext from '../../contexts/UrlParameters/context';

export default () => {

    const { resetParams } = useContext(UrlParametersContext);

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
        </Header>
    )
}