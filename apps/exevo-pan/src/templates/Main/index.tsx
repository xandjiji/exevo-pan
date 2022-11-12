import Header from './Header'
import Footer from './Footer'

type MainProps = { children: JSX.Element | JSX.Element[] }

export default ({ children }: MainProps) => (
  <div className="flex min-h-screen flex-col">
    <Header />
    {children}
    <Footer />
  </div>
)
