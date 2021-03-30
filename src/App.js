import React from 'react';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import MasterLayout from './layouts/MasterLayout';
import Header from './components/Header';

import CharGrid from './components/CharGrid';
import Pushable from './components/Pushable';
import SideDrawer from './components/SideDrawer';

import SideDrawerProvider from './contexts/SideDrawer/'
import SideDrawerContext from './contexts/SideDrawer/context';

import CharacterDataProvider from './contexts/CharacterData';
import ItemsDataProvider from './contexts/ItemsData';
import ServerDataProvider from './contexts/ServerData';
import ThemeProvider from './contexts/Theme';

import ErrorBoundary from './components/ErrorBoundary';

const App = () => {
    return (
        <ErrorBoundary>
            <ThemeProvider>
                <Router>
                    <MasterLayout>

                        <Header>
                            <NavLink
                                to="/"
                                exact
                                className="clickable"
                                activeClassName="active"
                            >
                                Current Auctions
                            </NavLink>
                            <NavLink
                                to="/bazaar-history"
                                exact
                                className="clickable"
                                activeClassName="active"
                            >
                                Bazaar History
                            </NavLink>
                        </Header>

                        <SideDrawerProvider>
                            <ServerDataProvider>
                                <CharacterDataProvider>

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