import { Shine } from 'components/Atoms'
import { links } from 'Constants'

export function BestiaryArenaCTA() {
  return (
    <a
      className="clickable animate-fadeIn h-[36px] shadow"
      title="Play Bestiary Arena for free now!"
      href={links.BESTIARY_ARENA}
    >
      <Shine animationIterationCount="infinite" width={60} />

      <img
        alt="Bestiary Arena"
        width={150}
        height={36}
        src="/bestiary-widget.png"
        style={{ imageRendering: 'pixelated' }}
      />
    </a>
  )
}
