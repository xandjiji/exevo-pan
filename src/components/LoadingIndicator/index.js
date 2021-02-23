import React from 'react';
import LoadingIndicator from './LoadingIndicator.styled';

export default () => {
    return (
        <LoadingIndicator className="shadow">
            <div className="data-loader"></div>
            Updating data...
        </LoadingIndicator>
    )
};