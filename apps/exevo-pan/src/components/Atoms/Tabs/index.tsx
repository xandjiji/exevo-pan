import { useState, Children, isValidElement, cloneElement } from 'react'
import * as S from './styles'
import { TabsProps, PanelProps } from './types'

const Tabs = ({
  activeIndex: indexProp,
  initialActive = 0,
  children,
}: TabsProps): JSX.Element => {
  const [innerIndex, setInnerIndex] = useState(indexProp ?? initialActive)
  const activeIndex = indexProp ?? innerIndex

  return (
    <S.Wrapper>
      <S.TabWrapper aria-label="basic tabs example" role="tablist">
        {Children.map(children, (child, childIndex) => {
          if (!isValidElement(child)) return child
          const { label } = child.props as PanelProps

          return (
            <S.TabItem
              type="button"
              role="tab"
              aria-controls="random-panel-id"
              id="random-tab-id"
              tabIndex={0}
              aria-selected={childIndex === activeIndex}
            >
              {label}
            </S.TabItem>
          )
        })}
      </S.TabWrapper>

      {Children.map(children, (child, childIndex) => {
        if (!isValidElement(child)) return child

        return cloneElement(child, {
          id: 'random-panel-id',
          'aria-labelledby': 'random-tab-id',
          active: childIndex === activeIndex,
        })
      })}
    </S.Wrapper>
  )
}

const Panel = ({ active, children, ...props }: PanelProps): JSX.Element => (
  <S.Panel {...props}>{active && children}</S.Panel>
)

Tabs.Panel = Panel

export default Tabs
