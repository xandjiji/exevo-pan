import { useTranslations } from 'contexts/useTranslation'
import styled from 'styled-components'
import { v4 as uuidv4 } from 'uuid'
import { SpritePortrait } from 'components/Atoms'

const ItemWrapper = styled.div`
  margin-bottom: 12px;
  display: flex;
  justify-content: space-around;
  > * {
    width: 48px;
    height: 48px;
  }
`

interface CharacterItemsProps extends React.HTMLAttributes<HTMLDivElement> {
  items: number[]
}

const fillItems = (amount: number) =>
  Array.from({ length: amount }, () => (
    <SpritePortrait key={uuidv4()} alt="No item" lazy={false} />
  ))

const CharacterItems = ({
  items,
  ...props
}: CharacterItemsProps): JSX.Element => {
  const {
    translations: { common },
  } = useTranslations()

  return (
    <ItemWrapper {...props}>
      {items.map((item) => (
        <SpritePortrait
          key={uuidv4()}
          alt={common.CharacterCard.featuredItem}
          src={`https://static.tibia.com/images/charactertrade/objects/${item}.gif`}
          style={{ width: 32, height: 32 }}
          lazy
        />
      ))}
      {fillItems(4 - items.length)}
    </ItemWrapper>
  )
}

export default CharacterItems
