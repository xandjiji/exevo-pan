import React from 'react';
import ErrorBoundaryStyled, { Nav } from './ErrorPage.styled';
import { NavLink } from 'react-router-dom';
import { routes } from 'Constants'

import { ReactComponent as ErrorIcon } from '../../assets/svgs/error.svg';

export default ({ mainMessage, paragraphs }) => (
    <ErrorBoundaryStyled>
        <div className="top">
            {mainMessage && <span>{mainMessage}</span>}
        </div>
        <div className="bottom">
            <ErrorIcon />
            {paragraphs && paragraphs.map(text => <p>{text}</p>)}

            <Nav className="inner-container">
                <ul>
                    <li>
                        <NavLink to={routes.HOME}>Current Auctions</NavLink>
                    </li>
                    <li>
                        <NavLink to={routes.BAZAAR_HISTORY}>Bazaar History</NavLink>
                    </li>
                    <li>
                        <NavLink to={routes.STATISTICS}>Statistics</NavLink>
                    </li>
                </ul>
            </Nav>
        </div>
    </ErrorBoundaryStyled>
)