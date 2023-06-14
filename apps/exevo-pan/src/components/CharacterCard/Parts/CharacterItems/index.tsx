import { memo, useMemo } from 'react'
import clsx from 'clsx'
import { useTranslations } from 'contexts/useTranslation'
import { v4 as uuidv4 } from 'uuid'
import { SpritePortrait } from 'components/Atoms'
import { Background } from 'components/Atoms/SpritePortrait'
import { CharacterItemsProps } from './types'

const fillItems = (amount: number) =>
  Array.from({ length: amount }, () => <Background key={uuidv4()} />)

const CharacterItems = ({
  items,
  className,
  ...props
}: CharacterItemsProps) => {
  const { common } = useTranslations()

  const emptyItems = useMemo(() => fillItems(4 - items.length), [items.length])

  return (
    <div className={clsx('flex justify-around', className)} {...props}>
      {items.map((floatItem, childrenIndex) => {
        const [item, tier] = floatItem.toString().split('.')
        const key = `${childrenIndex}-${item}`
        return (
          <SpritePortrait
            key={key}
            counter={tier}
            title={tier ? `tier ${tier}` : undefined}
            alt={common.CharacterCard.featuredItem}
            src={`https://static.tibia.com/images/charactertrade/objects/${item}.gif`}
            width={32}
            height={32}
          />
        )
      })}
      {emptyItems}
    </div>
  )
}

export default memo(CharacterItems)
