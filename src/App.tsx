import { BrowserRouter as Router } from 'react-router-dom'
import ErrorBoundary from 'components/ErrorBoundary'
import { ThemeProvider } from 'contexts/useTheme'
import { DatabaseProvider } from 'contexts/useDatabase'
import { Main } from 'templates'

const App = (): JSX.Element => {
  return (
    <Router>
      <ErrorBoundary>
        <ThemeProvider>
          <DatabaseProvider>
            <Main />
          </DatabaseProvider>
        </ThemeProvider>
      </ErrorBoundary>
    </Router>
  )
}

export default App
