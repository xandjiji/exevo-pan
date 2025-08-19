/* eslint-disable jsx-a11y/anchor-has-content */
import { links } from 'Constants'
import { memo, useState } from 'react'

export const BestiaryArenaCTA = memo(() => {
  const [loaded, setLoaded] = useState(false)
  return (
    <div
      className={`relative hidden h-[144px] w-[276px] cursor-pointer shadow transition-opacity lg:block ${
        loaded ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <iframe
        src={`${links.BESTIARY_ARENA}/iframe-obs-3?totalDuration=13&timeBeforeFadeIn=9`}
        width="276"
        height="144"
        scrolling="no"
        loading="lazy"
        frameBorder={0}
        title="Bestiary Arena"
        className="absolute bottom-0 right-0"
        onLoad={() => setLoaded(true)}
      />

      <a
        href={links.BESTIARY_ARENA}
        target="_blank"
        rel="noopener external nofollow noreferrer"
        aria-label="Play Bestiary Arena on your browser!"
        className="z-1 absolute bottom-0 right-0 block h-full w-full"
      />
    </div>
  )
})
