import React from 'react';
import MasterLayout from '../layouts/MasterLayout';
import CharGrid from '../components/CharGrid';
import Pushable from '../components/Pushable';
import SideDrawer from '../components/SideDrawer';

import SideDrawerProvider from '../contexts/SideDrawerContext/'
import SideDrawerContext from '../contexts/SideDrawerContext/context';

const IndexPage = () => {
    return (
        <MasterLayout>
            <SideDrawerProvider>
                <CharGrid itemsPerPage={10} />

                <SideDrawerContext.Consumer>
                    {context => (
                        <Pushable
                            active={context.active}
                            trigger={context.toggleSideDrawer}
                            blockRight
                            backdrop
                        >
                            <SideDrawer backAction={context.toggleSideDrawer} />
                        </Pushable>
                    )}
                </SideDrawerContext.Consumer>
            </SideDrawerProvider>
        </MasterLayout>
    )
}

export default IndexPage;
