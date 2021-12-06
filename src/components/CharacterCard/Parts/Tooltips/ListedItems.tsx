import * as S from './styles'
import { ListedItemsProps } from './types'

const ListedItems = ({
  fullList,
  characterSet,
}: ListedItemsProps): JSX.Element => (
  <>
    {fullList.map((item) => (
      <S.Item key={item} active={characterSet.has(item)}>
        {item}
      </S.Item>
    ))}
  </>
)

export default ListedItems
