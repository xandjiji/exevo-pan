import {
  forwardRef,
  useState,
  useCallback,
  useEffect,
  Children,
  isValidElement,
  cloneElement,
} from 'react'
import clsx from 'clsx'
import useIds from './useIds'
import styles from './styles.module.css'
import { TabsProps, PanelProps } from './types'

const Group = forwardRef(
  (
    {
      activeIndex: indexProp,
      initialActive = 0,
      onChange,
      className,
      children,
      'aria-label': ariaLabelProp,
      ...props
    }: TabsProps,
    ref,
  ) => {
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
      <div
        className={clsx('grid w-full gap-3 overflow-hidden', className)}
        {...props}
        ref={ref as React.RefObject<HTMLDivElement>}
      >
        <div
          role="tablist"
          aria-label={ariaLabelProp}
          className="bg-surface custom-scrollbar flex w-full flex-nowrap overflow-x-auto whitespace-nowrap"
          style={{ borderBottom: 'solid 1px var(--separator)' }}
        >
          {Children.map(children, (child, childIndex) => {
            if (!isValidElement(child)) return child
            const { label } = child.props as PanelProps

            const isSelected = childIndex === activeIndex

            return (
              <button
                type="button"
                role="tab"
                aria-controls={getPanelId(childIndex)}
                id={getTabId(childIndex)}
                tabIndex={0}
                aria-selected={childIndex === activeIndex}
                onClick={() => handleClick(childIndex)}
                className={clsx(
                  styles.iconStyle,
                  'text-tsm flex cursor-pointer gap-[6px] py-2 px-4 font-bold tracking-wider transition-colors',
                  isSelected
                    ? 'text-primaryHighlight child:fill-primaryHighlight'
                    : 'text-separator hover:bg-primaryVariantHighlight hover:text-onSurface child:fill-separator child:hover:fill-onSurface',
                )}
                style={{
                  borderBottom: 'solid 2px',
                  borderColor: isSelected
                    ? 'var(--primaryHighlight)'
                    : 'transparent',
                }}
              >
                {label}
              </button>
            )
          })}
        </div>

        {Children.map(children, (child, childIndex) => {
          if (!isValidElement(child)) return child

          return cloneElement(child, {
            id: getPanelId(childIndex),
            'aria-labelledby': getTabId(childIndex),
            active: childIndex === activeIndex,
            label: undefined,
          })
        })}
      </div>
    )
  },
)

const Panel = ({ active, children, className, ...props }: PanelProps) => (
  <div
    role="tabpanel"
    className={clsx('w-full', !active && 'hidden', className)}
    {...props}
  >
    {active && children}
  </div>
)

export default { Group, Panel }

/* background-color: rgb(var(--tw-red) / var(--tw-bg-opacity)); */
