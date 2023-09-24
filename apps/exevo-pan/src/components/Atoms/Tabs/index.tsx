import {
  Children,
  cloneElement,
  forwardRef,
  isValidElement,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'
import clsx from 'clsx'
import { useIsMounted } from 'hooks'
import { scrollHorizontallyIntoView } from 'utils'
import useIds from './useIds'
import styles from './styles.module.css'
import { PanelProps, TabsProps } from './types'

const Group = forwardRef<HTMLDivElement, TabsProps>(
  (
    {
      activeIndex: indexProp,
      initialActive = 0,
      onChange,
      className,
      children,
      'aria-label': ariaLabelProp,
      ...props
    },
    ref,
  ) => {
    const [innerIndex, setInnerIndex] = useState(indexProp ?? initialActive)
    const activeIndex = indexProp ?? innerIndex

    const { getTabId, getPanelId } = useIds()

    const handleClick = useCallback(
      (newIndex: number) => {
        const isControlled = indexProp !== undefined

        if (isControlled) {
          if (indexProp !== newIndex) onChange?.(newIndex)
        } else {
          setInnerIndex((prevIndex) => {
            if (prevIndex !== newIndex) onChange?.(newIndex)
            return newIndex
          })
        }
      },
      [indexProp, onChange],
    )

    const tablistRef = useRef<HTMLDivElement>(null)
    const isMounted = useIsMounted()
    useEffect(() => {
      if (!isMounted) return
      const activeTab = tablistRef.current?.children[activeIndex]

      if (activeTab) scrollHorizontallyIntoView(activeTab)
    }, [activeIndex])

    return (
      <div
        className={clsx('grid w-full gap-3', className)}
        {...props}
        ref={ref}
      >
        <div
          ref={tablistRef}
          role="tablist"
          aria-label={ariaLabelProp}
          className="custom-scrollbar flex w-full flex-nowrap overflow-x-auto whitespace-nowrap"
          style={{
            borderBottom: 'solid 1px rgb(var(--separator))',
            background: 'inherit',
          }}
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
                  'text-tsm flex cursor-pointer gap-1.5 py-2 px-4 font-bold tracking-wider transition-colors',
                  isSelected
                    ? 'text-primaryHighlight child:fill-primaryHighlight'
                    : 'text-separator hover:text-onSurface child:fill-separator child:hover:fill-onSurface',
                )}
                style={{
                  background: 'inherit',
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
          if (typeof child.type === 'string') return child

          return cloneElement(child as any, {
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
    data-active={active}
    {...props}
  >
    {active && children}
  </div>
)

export default { Group, Panel }
