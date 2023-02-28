import clsx from 'clsx'
import { vocation } from 'data-dictionary/dist/dictionaries/vocations'
import { ChevronRightIcon } from 'assets/svgs'
import CharacterMiniCard from 'components/CharacterMiniCard'
import { loadOutfitSrc } from 'utils'
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
        'group relative left-0 flex w-full cursor-pointer items-center justify-between text-left outline-none transition-all hover:left-1.5 focus:left-1.5',
        isSelected && 'left-1.5',
        isSelected && styles.highlight,
        styles.button,
        className,
      )}
      {...props}
    >
      <CharacterMiniCard
        outfitSrc={loadOutfitSrc(outfitId)}
        characterData={{
          level,
          name: nickname,
          vocation: vocation.getPromotedName({ vocationId, level }),
          world: '',
        }}
      />
      <ChevronRightIcon className="fill-onSurface group-focus:fill-primaryHighlight w-8" />
    </button>
  )
}

export default AuctionItem
