/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useTranslations } from 'contexts/useTranslation'
import { useCallback, useId, useState } from 'react'
import clsx from 'clsx'
import { AdvertiseIcon, TagIcon } from 'assets/svgs'
import { routes } from 'Constants'
import { HoveredState } from './types'

const TagButton = ({ ...props }: React.HTMLAttributes<HTMLDivElement>) => {
  const { common } = useTranslations()

  const [hoverState, setHoverState] = useState<HoveredState>('initial')

  const handleHover = useCallback(() => {
    setHoverState('hover')
  }, [])

  const handleUnhover = useCallback(() => {
    setHoverState('off')
  }, [])

  const labelId = useId()

  return (
    <a href={routes.ADVERTISE}>
      <div
        tabIndex={0}
        onMouseOver={handleHover}
        onFocus={handleHover}
        onMouseOut={handleUnhover}
        onBlur={handleUnhover}
        aria-describedby={labelId}
        className="z-2 relative h-11 w-7 shrink-0 cursor-pointer self-start"
        {...props}
      >
        <div className="z-2 absolute-centered h-[72px] w-16" />
        <div
          className={clsx(
            'animate-swing z-1 relative h-full w-full',
            hoverState === 'hover' && 'animate-tilt',
            hoverState === 'off' && 'animate-letGo',
            hoverState === 'initial' && 'animate-swing',
          )}
          style={{
            transformOrigin: '50% 0',
            animationDelay: clsx(hoverState === 'initial' && '1s'),
          }}
        >
          <TagIcon
            className="h-full w-full"
            style={{ filter: 'drop-shadow(2px 2px 2px rgba(0, 0, 0, 0.3)' }}
          />
          <AdvertiseIcon
            className="z-1 fill-onPrimary absolute h-4 w-4"
            style={{
              top: 'calc(50% + 6px)',
              left: 'calc(50% - 1px)',
              transform: 'translate(-50%, -50%)',
            }}
          />
        </div>

        <p
          id={labelId}
          className={clsx(
            'text-onSurface absolute bottom-0 left-1/2 text-center text-xs transition-opacity',
            hoverState !== 'hover' && 'opacity-0',
          )}
          style={{ transform: 'translateX(-50%)' }}
        >
          {common.CharacterCard.highlightLabelText}
        </p>
      </div>
    </a>
  )
}

export default TagButton
