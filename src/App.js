import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import ErrorBoundary from './components/ErrorBoundary';
import { ThemeProvider } from 'contexts/useTheme';
import { DatabaseProvider } from 'contexts/useDatabase';
import { Main } from 'templates';


const App = () => {
    return (
        <ErrorBoundary>
            <Router>
                <ThemeProvider>
                    <DatabaseProvider>

                        <Main />

                    </DatabaseProvider>
                </ThemeProvider>
            </Router>
        </ErrorBoundary>
    )
}

export default App;