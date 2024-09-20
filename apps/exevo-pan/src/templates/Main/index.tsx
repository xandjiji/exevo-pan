import MobileTopCTA from './MobileTopCTA'
import Header from './Header'
import Footer from './Footer'
import ExevoProCTA from './ExevoProCTA'
import { RavendawnCTA } from './RavendawnCTA'
import { NoPingCTA } from './NoPingCTA'

type MainProps = { clean?: boolean; children: React.ReactNode }

export default ({ clean = false, children }: MainProps) => (
  <div className="flex min-h-screen flex-col">
    {!clean && <MobileTopCTA />}
    <Header clean={clean} />
    {children}
    <Footer variant={clean ? 'surface' : 'primary'} />

    {!clean && (
      <>
        <NoPingCTA />
        <RavendawnCTA />
        <ExevoProCTA />
      </>
    )}
  </div>
)
