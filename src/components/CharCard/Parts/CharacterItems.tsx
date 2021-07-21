import styled from 'styled-components'
import { v4 as uuidv4 } from 'uuid'
import { SpritePortrait } from 'components/Atoms'

const ItemWrapper = styled.div`
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
    <SpritePortrait key={uuidv4()} alt="No item" />
  ))

const CharacterItems = ({ items }: CharacterItemsProps): JSX.Element => (
  <ItemWrapper>
    {items.map(item => (
      <SpritePortrait
        key={uuidv4()}
        alt="Featured item"
        src={`https://static.tibia.com/images/charactertrade/objects/${item}.gif`}
      />
    ))}
    {fillItems(4 - items.length)}
  </ItemWrapper>
)

export default CharacterItems
