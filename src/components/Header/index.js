import React, { useContext } from 'react';
import Header, { HeaderItem, Logo } from './Header.styled';
import { NavLink } from 'react-router-dom';

import logo from '../../assets/logo.png';

import UrlParametersContext from '../../contexts/UrlParameters/context';

export default () => {

    const { setParamByKey } = useContext(UrlParametersContext);

    const setParams = () => {
        setParamByKey('pageIndex', 0);
        setParamByKey('itemSet', null);
        setParamByKey('initialOrder', null);
        setParamByKey('initialSort', null);
    }

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
                            onClick={() => setParams()}
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
                            onClick={() => setParams()}
                        >
                            Bazaar History
                        </NavLink>
                    </HeaderItem>
                </ul>
            </nav>
        </Header>
    )
}