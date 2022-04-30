import { useCallback } from 'react'
import clsx from 'clsx'
import { useTranslations } from 'contexts/useTranslation'
import { formatNumberWithCommas } from 'utils'
import { Checkbox } from 'components/CharacterCard/atoms'
import { SpritePortrait, ActiveCount } from 'components/Atoms'
import { NotifyErrorClient } from 'services'
import { rareMountSet, testRareOutfit } from '../../Parts/SpecialTags/utils'
import { addonCheck } from './utils'
import { SpriteBoxProps } from './types'

const SpriteBox = ({
  auctionId,
  offset = false,
  name,
  sex,
  src,
  type,
  amount = 0,
  checkRareMount = false,
  checkRareOutfit = false,
}: SpriteBoxProps) => {
  const {
    translations: { common },
  } = useTranslations()

  const isRareMount = checkRareMount ? rareMountSet.has(name) : false
  const isRareOutfit =
    checkRareOutfit && type ? testRareOutfit({ name, type, sex }) : false

  const isRare = isRareMount || isRareOutfit
  const showAddon = type !== undefined

  const notifyError = useCallback(
    () => NotifyErrorClient.setMessage({ auctionId, name, src }),
    [auctionId, name, src],
  )

  return (
    <div
      title={amount > 1 ? `${formatNumberWithCommas(amount)}x ${name}` : name}
      className={clsx(
        'relative rounded-md',
        showAddon && 'pb-2 shadow',
        isRare ? 'bg-primaryHighlight' : 'bg-primaryVariant',
      )}
    >
      <SpritePortrait
        offset={offset}
        alt={name}
        src={src}
        width={offset ? 64 : 32}
        height={offset ? 64 : 32}
        onError={notifyError}
        highlight={isRare}
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

      {amount > 1 && (
        <ActiveCount
          className="z-1 absolute top-[-6px] right-[-6px] py-[2px] px-1 font-bold after:ml-[1px] after:font-normal after:content-['x']"
          style={{
            width: 'unset',
            height: 'unset',
            borderRadius: '4px',
          }}
        >
          {amount}
        </ActiveCount>
      )}
    </div>
  )
}

export default SpriteBox
