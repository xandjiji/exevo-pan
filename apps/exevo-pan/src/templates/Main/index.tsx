import Header from './Header'
import Footer from './Footer'

type MainProps = { children: React.ReactNode }

export default ({ children }: MainProps): JSX.Element => (
  <>
    <Header />
    {children}
    <Footer />
  </>
)
