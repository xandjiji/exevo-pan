import {
  forwardRef,
  useState,
  useCallback,
  useEffect,
  Children,
  isValidElement,
  cloneElement,
} from 'react'
import useIds from './useIds'
import * as S from './styles'
import { TabsProps, PanelProps } from './types'

const Group = forwardRef(
  (
    {
      activeIndex: indexProp,
      initialActive = 0,
      onChange,
      children,
      'aria-label': ariaLabelProp,
      ...props
    }: TabsProps,
    ref,
  ): JSX.Element => {
    const [innerIndex, setInnerIndex] = useState(indexProp ?? initialActive)
    const activeIndex = indexProp ?? innerIndex

    const { getTabId, getPanelId } = useIds()

    const handleClick = useCallback(
      (newIndex: number) =>
        setInnerIndex((prevIndex) => {
          if (prevIndex !== newIndex) onChange?.(newIndex)
          return newIndex
        }),
      [onChange],
    )

    useEffect(() => {
      const activeTab = document.getElementById(getTabId(activeIndex))

      if (activeTab) {
        const { offsetLeft, parentElement } = activeTab
        parentElement?.scroll({ left: offsetLeft, behavior: 'smooth' })
      }
    }, [activeIndex, getTabId])

    return (
      <S.Wrapper {...props} ref={ref as React.RefObject<HTMLDivElement>}>
        <S.TabWrapper aria-label={ariaLabelProp} role="tablist">
          {Children.map(children, (child, childIndex) => {
            if (!isValidElement(child)) return child
            const { label } = child.props as PanelProps

            return (
              <S.Tab
                type="button"
                role="tab"
                aria-controls={getPanelId(childIndex)}
                id={getTabId(childIndex)}
                tabIndex={0}
                aria-selected={childIndex === activeIndex}
                onClick={() => handleClick(childIndex)}
              >
                {label}
              </S.Tab>
            )
          })}
        </S.TabWrapper>

        {Children.map(children, (child, childIndex) => {
          if (!isValidElement(child)) return child

          return cloneElement(child, {
            id: getPanelId(childIndex),
            'aria-labelledby': getTabId(childIndex),
            active: childIndex === activeIndex,
            label: undefined,
          })
        })}
      </S.Wrapper>
    )
  },
)

const Panel = ({ active, children, ...props }: PanelProps): JSX.Element => (
  <S.Panel role="tabpanel" data-active={active} {...props}>
    {active && children}
  </S.Panel>
)

export default { Group, Panel }
