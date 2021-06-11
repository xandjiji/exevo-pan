import React from 'react';
import Switch from './Switch.styled';

export default ({ children, active, onClick, icon }) => {
    return (
        <Switch className={`${active ? 'active' : ''}`} onClick={onClick} hasIcon={icon}>
            <div className="toggle">
                {icon ? icon : null}
            </div>
            {children}
        </Switch>
    )
}