import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import MasterLayout from './layouts/MasterLayout';

import UrlParametersProvider from './contexts/UrlParameters';
import { ThemeProvider } from 'contexts/useTheme';
import { DatabaseProvider } from 'contexts/useDatabase';

import ErrorBoundary from './components/ErrorBoundary';

const App = () => {
    return (
        <ErrorBoundary>
            <Router>
                <UrlParametersProvider>
                    <ThemeProvider>
                        <DatabaseProvider>

                            <MasterLayout />

                        </DatabaseProvider>
                    </ThemeProvider>
                </UrlParametersProvider>
            </Router>
        </ErrorBoundary>
    )
}

export default App;