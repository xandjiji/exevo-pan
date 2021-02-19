import React from 'react';
import Switch from './Switch.styled';

export default ({ children, active, onClick }) => {
    return (
        <Switch className={`${active ? 'active' : ''}`} onClick={onClick}>
            <div className="toggle"></div>
            {children}
        </Switch>
    )
}