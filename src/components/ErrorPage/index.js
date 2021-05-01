import React from 'react';
import ErrorBoundaryStyled, { Nav } from './ErrorPage.styled';
import { NavLink } from 'react-router-dom';

import { ReactComponent as ErrorIcon } from '../../assets/svgs/error.svg';

export default ({ mainMessage, paragraphs }) => (
    <ErrorBoundaryStyled>
        <div className="top">
            {mainMessage && <span>{mainMessage}</span>}
        </div>
        <div className="bottom">
            <ErrorIcon />
            {paragraphs && paragraphs.map(text => <p>{text}</p>)}

            <Nav>
                <ul>
                    <li>
                        <NavLink to="/">Current Auctions</NavLink>
                        <NavLink to="/bazaar-history">Bazaar History</NavLink>
                        <NavLink to="/statistics">Statistics</NavLink>
                    </li>
                </ul>
            </Nav>
        </div>
    </ErrorBoundaryStyled>
)