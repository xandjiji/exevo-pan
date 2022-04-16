import Header from './Header'
import Footer from './Footer'

type MainProps = { children: React.ReactNode }

export default ({ children }: MainProps) => (
  <div className="flex min-h-screen flex-col">
    <Header />
    {children}
    <Footer />
  </div>
)
