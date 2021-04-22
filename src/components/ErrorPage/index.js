import React from 'react';
import ErrorBoundaryStyled from './ErrorPage.styled';

import { ReactComponent as ErrorIcon } from '../../assets/svgs/error.svg';

export default ({ mainMessage, paragraphs }) => (
    <ErrorBoundaryStyled>
        <div className="top">
            {mainMessage && <span>{mainMessage}</span>}
        </div>
        <div className="bottom">
            <ErrorIcon />
            {paragraphs && paragraphs.map(text => <p>{text}</p>)}
        </div>
    </ErrorBoundaryStyled>
)