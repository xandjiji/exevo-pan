import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import MasterLayout from './layouts/MasterLayout';

import SideDrawerProvider from './contexts/SideDrawer/'
import CharacterDataProvider from './contexts/CharacterData';
import HistoryDataProvider from './contexts/HistoryData';
import ItemsDataProvider from './contexts/ItemsData';
import ServerDataProvider from './contexts/ServerData';
import ThemeProvider from './contexts/Theme';

import ErrorBoundary from './components/ErrorBoundary';

const App = () => {
    return (
        <ErrorBoundary>
            <Router>
                <ThemeProvider>
                    <CharacterDataProvider>
                        <HistoryDataProvider>
                            <ServerDataProvider>
                                <ItemsDataProvider>
                                    <SideDrawerProvider>

                                        <MasterLayout />

                                    </SideDrawerProvider>
                                </ItemsDataProvider>
                            </ServerDataProvider>
                        </HistoryDataProvider>
                    </CharacterDataProvider>
                </ThemeProvider>
            </Router>
        </ErrorBoundary>
    )
}

export default App;