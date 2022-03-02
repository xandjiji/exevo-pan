import { useState, Children, isValidElement } from 'react'
import * as S from './styles'
import { TabsProps, PanelProps } from './types'

const Tabs = ({
  currentIndex,
  initialIndex = 0,
  children,
}: TabsProps): JSX.Element => {
  const [innerIndex, setInnerIndex] = useState(currentIndex ?? initialIndex)
  const derivedIndex = currentIndex ?? innerIndex

  return (
    <S.Wrapper>
      <div>
        {Children.map(children, (child) => {
          if (!isValidElement(child)) return
          const { label } = child.props as PanelProps

          // eslint-disable-next-line consistent-return
          return <S.TabItem>{label}</S.TabItem>
        })}
      </div>
      {Children.map(children, (child, index) =>
        index === derivedIndex ? child : null,
      )}
    </S.Wrapper>
  )
}

const Panel = ({ children }: PanelProps): JSX.Element => <div>{children}</div>

Tabs.Panel = Panel

export default Tabs
