/* eslint-disable jsx-a11y/anchor-has-content */
import { links } from 'Constants'

export function BestiaryArenaCTA() {
  return (
    <div className="relative hidden h-[121px] w-[279px] cursor-pointer shadow lg:block">
      <iframe
        src={`${links.BESTIARY_ARENA}/iframe`}
        width="279"
        height="121"
        scrolling="no"
        loading="lazy"
        frameBorder={0}
        title="Bestiary Arena"
        className="absolute bottom-0 right-0"
      />

      <a
        href={links.BESTIARY_ARENA}
        target="_blank"
        rel="noopener external nofollow noreferrer"
        aria-label="Play Bestiary Arena for free now!"
        className="z-1 absolute bottom-0 right-0 block h-full w-full"
      />
    </div>
  )
}
