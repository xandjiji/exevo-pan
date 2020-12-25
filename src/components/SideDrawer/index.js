import React from 'react';
import SideDrawer from './SideDrawer.styled';

export default () => {
    return (
        <SideDrawer>
            <div className="drawer-header">
                HEADER
            </div>

            <div className="items-wrapper">
                ITEMS
            </div>
        </SideDrawer>
    )
}