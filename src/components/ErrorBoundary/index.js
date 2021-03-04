import React from 'react';

export default class ErrorBoundary extends React.Component {
    constructor(props) {
        super();
        this.state = { error: null, errorInfo: null };
    }

    componentDidCatch(error, info) {
        this.setState({ error, info, });
    }

    render() {
        if (this.state.error) {
            return (
                <div>
                    ERROR
                </div>
            );
        } else {
            return this.props.children;
        }
    }
}