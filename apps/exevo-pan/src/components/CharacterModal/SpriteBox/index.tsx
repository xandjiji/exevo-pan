import clsx from 'clsx'
import { useTranslations } from 'contexts/useTranslation'
import {
  rareMountSet,
  testRareOutfit,
} from 'shared-utils/dist/getCharacterTags'
import { formatNumberWithCommas } from 'utils'
import { Checkbox } from 'components/CharacterCard/atoms'
import { SpritePortrait } from 'components/Atoms'
import { addonCheck } from './utils'
import styles from './styles.module.css'
import { SpriteBoxProps } from './types'

const SpriteBox = ({
  offset = false,
  name,
  sex,
  src,
  type,
  amount = 0,
  checkRareMount = false,
  checkRareOutfit = false,
}: SpriteBoxProps) => {
  const { common } = useTranslations()

  const isRareMount = checkRareMount ? rareMountSet.has(name) : false
  const isRareOutfit =
    checkRareOutfit && type ? testRareOutfit({ name, type, sex }) : false

  const isRare = isRareMount || isRareOutfit
  const showAddon = type !== undefined

  return (
    <div
      title={amount > 1 ? `${formatNumberWithCommas(amount)}x ${name}` : name}
      className={clsx(
        'relative rounded-md',
        showAddon && 'pb-2 shadow',
        isRare ? 'bg-primary' : 'bg-primaryVariant',
        isRare && styles.highlighted,
      )}
    >
      <SpritePortrait
        offset={offset}
        counter={
          amount > 0 ? (
            <span className="after:font-light after:content-['x']">
              {amount}
            </span>
          ) : undefined
        }
        alt={name}
        src={src}
        width={offset ? 64 : 32}
        height={offset ? 64 : 32}
        className="pointer-events-none"
        style={showAddon ? { boxShadow: 'unset' } : undefined}
      />

      {showAddon && (
        <div className="flex justify-evenly">
          <Checkbox
            aria-label={
              common.CharacterCard.CharacterModal.SpriteBox.firstAddon
            }
            checked={addonCheck.first(type ?? 0)}
            greenVariant={isRare}
          />
          <Checkbox
            aria-label={
              common.CharacterCard.CharacterModal.SpriteBox.secondAddon
            }
            checked={addonCheck.second(type ?? 0)}
            greenVariant={isRare}
          />
        </div>
      )}
    </div>
  )
}

export default SpriteBox
