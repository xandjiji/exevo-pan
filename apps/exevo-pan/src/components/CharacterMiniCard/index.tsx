import { useTranslations } from 'contexts/useTranslation'
import clsx from 'clsx'
import { SpritePortrait, CopyButton, Sticker } from 'components/Atoms'
import ExternalIcon from 'assets/svgs/external.svg'
import { CharacterMiniCardProps } from './types'

const DEFAULT_OUTFIT_SRC =
  'https://static.tibia.com/images/charactertrade/outfits/128_0.gif'

const CharacterMiniCard = ({
  isCard = false,
  displayServer = false,
  outfitSrc = DEFAULT_OUTFIT_SRC,
  characterData,
  characterName,
  forceSubtitle,
  linkUrl,
  highlighted = false,
  permalink,
  className,
  ...props
}: CharacterMiniCardProps) => {
  const {
    translations: { common },
  } = useTranslations()

  const name = characterName ?? (characterData as SingleCharacterData).name

  return (
    <div
      className={clsx(
        'character-mini-card flex items-center gap-4',
        isCard && 'card',
        className,
      )}
      {...props}
    >
      <SpritePortrait
        offset
        width={64}
        height={64}
        src={outfitSrc}
        alt={name}
        title={name}
      />
      <div>
        <p
          className={clsx(
            'flex items-center gap-1 text-base font-bold',
            highlighted ? 'text-greenHighlight' : 'text-primaryHighlight',
          )}
        >
          {name}
          {linkUrl && (
            <a
              href={linkUrl}
              target="_blank"
              rel="noreferrer noopener external"
              onClick={(event) => event.stopPropagation()}
              className="text-none"
            >
              <ExternalIcon className="clickable fill-onSurface h-7 w-7 rounded p-0.5" />
              {common.CharacterTooltipLabel}
            </a>
          )}
          {/* @ ToDo: remove this element with the sticker */}
          {permalink && (
            <div className="relative">
              {/* @ ToDo: remove this sticker */}
              <Sticker
                localStorageKey="permalink-19875422"
                style={{
                  position: 'absolute',
                  top: 5,
                  right: -32,
                }}
              >
                New
              </Sticker>
              <CopyButton linkIcon big copyString={permalink} />
            </div>
          )}
        </p>
        <span className="text-tsm text-onSurface font-light tracking-wider">
          {forceSubtitle ??
            (characterData &&
              `Level ${characterData.level} - ${characterData.vocation}${
                displayServer ? ` (${characterData.world})` : ''
              }`)}
        </span>
      </div>
    </div>
  )
}

export default CharacterMiniCard
