/* eslint-disable jsx-a11y/anchor-has-content */
import { links } from 'Constants'
import { memo, useState } from 'react'

export const BestiaryArenaCTA = memo(() => {
  const [loaded, setLoaded] = useState(false)
  const [visible, setVisible] = useState(false)

  return (
    <div
      className={`relative hidden h-[144px] w-[276px] shadow transition-opacity lg:block ${
        visible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      {loaded && (
        <div
          className="animate-in animate-rollIn pointer-events-none absolute left-0 top-0"
          style={{
            animationDuration: '300ms',
          }}
          onAnimationEnd={() => setVisible(true)}
        />
      )}
      <iframe
        src={`${links.BESTIARY_ARENA}/iframe-obs-3?totalDuration=13&timeBeforeFadeIn=9&tag=exevoiframe`}
        width="276"
        height="144"
        scrolling="no"
        loading="lazy"
        frameBorder={0}
        title="Bestiary Arena"
        className="absolute bottom-0 right-0"
        onLoad={() => setLoaded(true)}
      />
    </div>
  )
})
