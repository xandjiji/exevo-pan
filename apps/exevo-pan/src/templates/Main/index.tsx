import { links } from 'Constants'
import { useEffect, useRef } from 'react'
import { useOnImageLoad } from 'hooks'
import { useSession } from 'next-auth/react'
import { useTranslations } from 'contexts/useTranslation'
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
  const ref = useRef<HTMLImageElement>(null)
  const session = useSession()
  const [loaded, onLoadingComplete] = useOnImageLoad()

  useEffect(() => {
    if (ref.current?.complete) onLoadingComplete()
  }, [])

  if (session.status === 'loading') return null

  return (
    <a
      className="animate-fadeIn"
      href={links.TIBIA_CHRONICLES}
      target="_blank"
      rel="noopener external nofollow noreferrer"
    >
      <img
        ref={ref}
        onLoad={onLoadingComplete}
        loading="lazy"
        alt="Tibia Chronicles"
        className={loaded ? 'animate-fadeIn' : ''}
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

function PokemonCTA() {
  const ref = useRef<HTMLImageElement>(null)
  const session = useSession()
  const [loaded, onLoadingComplete] = useOnImageLoad()

  const { common } = useTranslations()

  useEffect(() => {
    if (ref.current?.complete) onLoadingComplete()
  }, [])

  if (session.status === 'loading') return null

  return (
    <a
      className={`animate-fadeIn bg-surface text-onSurface clickable border-1 border-separator/50 text-s relative flex items-center gap-2 whitespace-nowrap rounded-md border-solid py-2.5 px-3 opacity-0 shadow md:py-2 ${
        loaded ? 'animate-fadeIn' : ''
      }`}
      style={{ animationFillMode: 'forwards' }}
      href={common.otPokemonCta.link}
      target="_blank"
      rel="noopener external nofollow noreferrer"
    >
      <img
        ref={ref}
        onLoad={onLoadingComplete}
        loading="lazy"
        alt="otPokemon"
        src="https://i.imgur.com/waokAhF.png"
        width="126"
        height="16"
        style={{ filter: 'drop-shadow(0 0 3px #00000060)' }}
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
          <ExevoProCTA />
          <PokemonCTA />
          <TibiaChroniclesCTA />
        </div>
        <BestiaryArenaCTA />
      </div>
    )}
  </div>
)
