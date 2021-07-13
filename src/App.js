import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import MasterLayout from './layouts/MasterLayout';

import UrlParametersProvider from './contexts/UrlParameters';
import { ThemeProvider } from 'contexts/useTheme';
import HistoryDataProvider from './contexts/HistoryData';
import { DatabaseProvider } from 'contexts/useDatabase';
import ItemsDataProvider from './contexts/ItemsData';
import SideDrawerProvider from './contexts/SideDrawer/'

import ErrorBoundary from './components/ErrorBoundary';

const App = () => {
    return (
        <ErrorBoundary>
            <Router>
                <UrlParametersProvider>
                    <ThemeProvider>
                        <DatabaseProvider>
                            <HistoryDataProvider>
                                <ItemsDataProvider>
                                    <SideDrawerProvider>

                                        <MasterLayout />

                                    </SideDrawerProvider>
                                </ItemsDataProvider>
                            </HistoryDataProvider>
                        </DatabaseProvider>
                    </ThemeProvider>
                </UrlParametersProvider>
            </Router>
        </ErrorBoundary>
    )
}

export default App;