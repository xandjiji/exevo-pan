import MobileTopCTA from './MobileTopCTA'
import Header from './Header'
import Footer from './Footer'
import ExevoProCTA from './ExevoProCTA'
import { RavendawnCTA } from './RavendawnCTA'
import { BestiaryArenaCTA } from './BestiaryArenaCTA'
// import { NoPingCTA } from './NoPingCTA'

type MainProps = { clean?: boolean; children: React.ReactNode }

export default ({ clean = false, children }: MainProps) => (
  <div className="flex min-h-screen flex-col">
    {!clean && <MobileTopCTA />}
    <Header clean={clean} />
    {children}
    <Footer variant={clean ? 'surface' : 'primary'} />

    {!clean && (
      <div className="z-71 fixed bottom-3 left-[calc(100vw-162px)] flex flex-col items-end gap-2 md:bottom-5 md:left-[calc(100vw-174px)] lg:left-[calc(100vw-319px)]">
        <div className="grid gap-2">
          <ExevoProCTA />
          <RavendawnCTA />
        </div>
        <BestiaryArenaCTA />
      </div>
    )}
  </div>
)

// <NoPingCTA />
