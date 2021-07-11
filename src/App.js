import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import MasterLayout from './layouts/MasterLayout';

import UrlParametersProvider from './contexts/UrlParameters';
import { ThemeProvider } from 'contexts/useTheme';
import CharacterDataProvider from './contexts/CharacterData';
import HistoryDataProvider from './contexts/HistoryData';
import { ServerDataProvider } from 'contexts/useServerData';
import ItemsDataProvider from './contexts/ItemsData';
import SideDrawerProvider from './contexts/SideDrawer/'

import ErrorBoundary from './components/ErrorBoundary';

const App = () => {
    return (
        <ErrorBoundary>
            <Router>
                <UrlParametersProvider>
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
                </UrlParametersProvider>
            </Router>
        </ErrorBoundary>
    )
}

export default App;