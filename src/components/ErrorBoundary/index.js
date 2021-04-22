import React from 'react';
import ErrorPage from '../ErrorPage';

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
            return <ErrorPage
                mainMessage="ERROR"
                paragraphs={['oops! something unexpected happened', 'lets try again...']}
            />;
        } else {
            return this.props.children;
        }
    }
}