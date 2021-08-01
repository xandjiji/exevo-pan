import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import MasterLayout from './layouts/MasterLayout';

import { ThemeProvider } from 'contexts/useTheme';
import { DatabaseProvider } from 'contexts/useDatabase';

import ErrorBoundary from './components/ErrorBoundary';

const App = () => {
    return (
        <ErrorBoundary>
            <Router>
                <ThemeProvider>
                    <DatabaseProvider>

                        <MasterLayout />

                    </DatabaseProvider>
                </ThemeProvider>
            </Router>
        </ErrorBoundary>
    )
}

export default App;