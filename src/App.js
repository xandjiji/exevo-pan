import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import MasterLayout from './layouts/MasterLayout';

import Pushable from './components/Pushable';
import SideDrawer from './components/SideDrawer';

import SideDrawerProvider from './contexts/SideDrawer/'
import SideDrawerContext from './contexts/SideDrawer/context';

import CharacterDataProvider from './contexts/CharacterData';

import HistoryDataProvider from './contexts/HistoryData';

import ItemsDataProvider from './contexts/ItemsData';
import ServerDataProvider from './contexts/ServerData';
import ThemeProvider from './contexts/Theme';

import CharGridSwitcher from './Routes/CharGridSwitcher';

import ErrorBoundary from './components/ErrorBoundary';

const App = () => {
    return (
        <ErrorBoundary>
            <ThemeProvider>
                <Router>
                    <MasterLayout>

                        <SideDrawerProvider>
                            <ServerDataProvider>
                                <CharacterDataProvider>
                                    <HistoryDataProvider>

                                        <CharGridSwitcher />

                                        <ItemsDataProvider>
                                            <SideDrawerContext.Consumer>
                                                {sideDrawercontext => (
                                                    <Pushable
                                                        active={sideDrawercontext.active}
                                                        trigger={sideDrawercontext.toggleSideDrawer}
                                                        blockRight
                                                        backdrop
                                                    >
                                                        <SideDrawer backAction={sideDrawercontext.toggleSideDrawer} />
                                                    </Pushable>
                                                )}
                                            </SideDrawerContext.Consumer>
                                        </ItemsDataProvider>

                                    </HistoryDataProvider>
                                </CharacterDataProvider>
                            </ServerDataProvider>
                        </SideDrawerProvider>

                    </MasterLayout>
                </Router>
            </ThemeProvider>
        </ErrorBoundary>
    )
}

export default App;