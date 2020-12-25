import React, { useState } from 'react';
import MasterLayout from '../layouts/MasterLayout';
import CharGrid from '../components/CharGrid';
import Pushable from '../components/Pushable';
import SideDrawer from '../components/SideDrawer';

const IndexPage = () => {
    const [drawerActive, setDrawerActive] = useState(false);

    const toggleDrawer = () => {
        setDrawerActive(!drawerActive);
    }

    return (
        <MasterLayout>
            <CharGrid itemsPerPage={10} toggleDrawer={toggleDrawer} />
            <Pushable
                active={drawerActive}
                trigger={toggleDrawer}
                blockRight
            >
                <SideDrawer toggleDrawer={toggleDrawer} />
            </Pushable>
        </MasterLayout>
    )
}

export default IndexPage;
