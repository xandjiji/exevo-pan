import clsx from 'clsx'
import { vocation } from 'shared-utils/dist/vocations'
import { ChevronRightIcon } from 'assets/svgs'
import CharacterMiniCard from 'components/CharacterMiniCard'
import { useForm } from '../../../contexts/Form'
import styles from './styles.module.css'
import { AuctionItemProps } from './types'

const AuctionItem = ({
  nickname,
  level,
  vocationId,
  outfitId,
  className,
  ...props
}: AuctionItemProps) => {
  const { selectedCharacter } = useForm()
  const isSelected = selectedCharacter?.nickname === nickname

  return (
    <button
      type="button"
      className={clsx(
        'relative left-0 flex w-full cursor-pointer items-center justify-between text-left transition-all hover:left-1.5',
        isSelected && 'left-1.5',
        isSelected && styles.highlight,
        styles.button,
        className,
      )}
      {...props}
    >
      <CharacterMiniCard
        outfitSrc={`https://static.tibia.com/images/charactertrade/outfits/${outfitId}.gif`}
        characterData={{
          level,
          name: nickname,
          vocation: vocation.getFullName(vocationId, level),
          world: '',
        }}
      />
      <ChevronRightIcon className="fill-onSurface w-8" />
    </button>
  )
}

export default AuctionItem
