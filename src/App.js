import React from 'react';
import MasterLayout from './layouts/MasterLayout';
import CharGrid from './components/CharGrid';
import Pushable from './components/Pushable';
import SideDrawer from './components/SideDrawer';

import SideDrawerProvider from './contexts/SideDrawer/'
import SideDrawerContext from './contexts/SideDrawer/context';

import CharacterDataProvider from './contexts/CharacterData';
import ItemsDataProvider from './contexts/ItemsData';
import ServerDataProvider from './contexts/ServerData';

const App = () => {
    return (
        <MasterLayout>

            <SideDrawerProvider>
                <CharacterDataProvider>
                    <ServerDataProvider>

                        <CharGrid itemsPerPage={10} />

                        <ItemsDataProvider>
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
                        </ItemsDataProvider>

                    </ServerDataProvider>
                </CharacterDataProvider>
            </SideDrawerProvider>

        </MasterLayout>
    )
}

export default App;