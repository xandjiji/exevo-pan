import React from 'react';
import ErrorBoundaryStyled from './ErrorBoundary.styled';

import { ReactComponent as ErrorIcon } from '../../assets/svgs/error.svg';

export default class ErrorBoundary extends React.Component {
    constructor(props) {
        super();
        this.state = { error: null, errorInfo: null };
    }

    componentDidCatch(error, info) {
        this.setState({ error, info, });
        localStorage.clear();
        setTimeout(() => window.location.reload(), 3000);
    }

    render() {
        if (this.state.error) {
            return (
                <ErrorBoundaryStyled>
                    <div className="top">
                        <span>ERROR</span>
                    </div>
                    <div className="bottom">
                        <ErrorIcon />
                        <p>oops! something unexpected happened</p>
                        <p>lets try again...</p>
                    </div>
                </ErrorBoundaryStyled>
            );
        } else {
            return this.props.children;
        }
    }
}