import React from 'react';
import SideDrawer from './SideDrawer.styled';

export default ({ toggleDrawer }) => {
    return (
        <SideDrawer>
            <div className="drawer-header">
                HEADER
            </div>

            <div className="items-wrapper">
                ITEMS
            </div>

            <div id="drawer-backdrop"></div>
        </SideDrawer>
    )
}