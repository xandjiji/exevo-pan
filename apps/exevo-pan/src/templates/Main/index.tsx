import { links } from 'Constants'
import { Shine } from 'components/Atoms'
import MobileTopCTA from './MobileTopCTA'
import Header from './Header'
import Footer from './Footer'
import ExevoProCTA from './ExevoProCTA'
import { BestiaryArenaCTA } from './BestiaryArenaCTA'

type MainProps = {
  clean?: boolean
  children: React.ReactNode
  bestiaryBannerVariant: number
}

function TibiaChroniclesCTA() {
  return (
    <a
      className="animate-fadeIn lg:order-last"
      href={links.TIBIA_CHRONICLES}
      target="_blank"
      rel="noopener external nofollow noreferrer"
    >
      <img
        alt="Tibia Chronicles"
        src="https://i.imgur.com/y3LVenn.png"
        width="160"
        height="47"
        style={{
          margin: '0px 0px -5px -8px',
          filter: 'drop-shadow(0 0 3px #000000bb)',
          transform: 'translateX(3px)',
        }}
      />
    </a>
  )
}

export default ({
  clean = false,
  children,
  bestiaryBannerVariant,
}: MainProps) => (
  <div className="flex min-h-screen flex-col">
    {!clean && <MobileTopCTA />}
    <Header clean={clean} />
    {children}
    <Footer
      variant={clean ? 'surface' : 'primary'}
      bestiaryBannerVariant={bestiaryBannerVariant}
    />

    {!clean && (
      <div className="z-71 fixed bottom-3 left-[calc(100vw-162px)] flex flex-col items-end gap-2 md:bottom-5 md:left-[calc(100vw-174px)] lg:left-[calc(100vw-319px)]">
        <div className="grid gap-2">
          <TibiaChroniclesCTA />
          <ExevoProCTA />
        </div>
        <BestiaryArenaCTA />
      </div>
    )}
  </div>
)
