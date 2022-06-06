/* eslint-disable jsx-a11y/control-has-associated-label */
import {
  forwardRef,
  useReducer,
  useRef,
  useCallback,
  useMemo,
  memo,
} from 'react'
import clsx from 'clsx'
import { Popover, Listbox, Option, Label } from 'components/Atoms'
import { useSharedRef, useUuid } from 'hooks'
import { indexToId } from 'components/Atoms/Listbox/utils'
import SelectReducer from './reducer'
import useValueRef from './useValueRef'
import { findOptionIndexByValue } from './utils'
import { SelectProps, Value } from './types'

/* @ ToDo: toggle on click */
/* @ ToDo: remove isMounted with array diff */
/* @ ToDo: abstract onInput to hook */
/* @ ToDo: USER_TYPING */
/* @ ToDo: abstract scroll highlight */
/* @ ToDo: use hook in AutocompleteInput (and others?) */

const Select = forwardRef<HTMLInputElement, SelectProps>(
  (componentProps: SelectProps, ref: React.Ref<HTMLInputElement>) => {
    const {
      id: idProp,
      className,
      style,
      'aria-label': ariaLabel,
      label,
      name,
      defaultValue: defaultValueProp,
      value: propValue,
      onChange,
      options,
      ...props
    } = componentProps

    const labelId = useUuid()
    const listboxId = useUuid()
    const uuid = useUuid()
    const inputId = idProp ?? uuid
    const accessibleLabel = typeof label === 'string' ? label : ariaLabel

    const innerRef = useSharedRef<HTMLInputElement>(ref)
    const selectRef = useRef<HTMLDivElement>(null)
    const dispatchedValue = useRef(propValue ?? defaultValueProp ?? '')

    const [{ innerValue, listboxStatus }, dispatch] = useReducer(
      SelectReducer,
      {
        isControlled: propValue !== undefined,
        innerValue: dispatchedValue.current,
        listboxStatus: false,
        dispatchChangeEvent: (dispatchValue: Value) => {
          dispatchedValue.current = dispatchValue
          const event = new Event('input', { bubbles: true })
          innerRef.current?.dispatchEvent?.(event)
        },
      },
    )

    const value = propValue ?? innerValue
    const valueRef = useValueRef(value)
    const selectedIndex = useMemo(
      () => findOptionIndexByValue(options, value),
      [value, options],
    )

    /* useEffect(() => {
    if (highlightedIndex !== undefined) {
      const item = document.getElementById(
        indexToId(highlightedIndex, listboxId) as string,
      )
      item?.scrollIntoView({
        block: 'nearest',
      })
    }
  }, [highlightedIndex, listboxId]) */

    const handleKeyboard: React.KeyboardEventHandler<HTMLInputElement> =
      useCallback(
        (event) => {
          switch (event.code) {
            case 'Escape':
            case 'Tab':
              dispatch({ type: 'SET_LISTBOX_STATUS', value: false })
              break
            case 'ArrowUp':
            case 'ArrowDown':
              dispatch({
                type: 'ARROW_NAVIGATION',
                code: event.code,
                options,
                currentValue: valueRef.current,
              })
              event.preventDefault()
              break
            case 'Enter':
            case 'NumpadEnter':
            case 'Space':
              dispatch({ type: 'SET_LISTBOX_STATUS' })
              break
            default:
              break
          }
        },
        [options],
      )

    return (
      <div className={clsx('child:w-full relative', className)} style={style}>
        <Label id={labelId} className="mb-2" htmlFor={inputId}>
          {label}
        </Label>
        <Popover
          placement="bottom"
          trigger="none"
          visible={listboxStatus}
          content={
            <Listbox
              id={listboxId}
              highlightedIndex={selectedIndex}
              onSelectOption={useCallback((option) => {
                dispatch({
                  type: 'OPTION_SELECTED',
                  selectedValue: option.value,
                })
                selectRef.current?.focus()
              }, [])}
              className="max-h-[210px]"
            >
              {options.map((option) => (
                <Option key={option.value} value={option.value}>
                  {option.name}
                </Option>
              ))}
            </Listbox>
          }
        >
          <div
            ref={selectRef}
            aria-label={accessibleLabel}
            role="combobox"
            aria-expanded="true"
            aria-controls={listboxId}
            aria-owns={listboxId}
            tabIndex={0}
            onClick={() =>
              dispatch({ type: 'SET_LISTBOX_STATUS', value: true })
            }
            onKeyDown={handleKeyboard}
            className={clsx(
              'text-tsm text-onSurface border-1 bg-surface flex h-9 w-full items-center rounded-md border-solid py-2.5 px-4 outline-none transition-all',
              /* isInvalid */ false
                ? 'border-red'
                : 'border-separator focus-within:border-primary',
              /* disabled */ false ? 'bg-separator' : 'bg-surface',
            )}
            {...props}
          >
            {options[selectedIndex]?.name}
          </div>
        </Popover>
        <input
          ref={innerRef}
          id={inputId}
          name={name}
          type="hidden"
          aria-label={accessibleLabel}
          value={value}
          onInput={(event: React.ChangeEvent<HTMLInputElement>) => {
            if (event.target.value === dispatchedValue.current) return
            // eslint-disable-next-line no-param-reassign
            event.target.value = dispatchedValue.current.toString()
            onChange?.(event as React.ChangeEvent<HTMLInputElement>)
          }}
        />
        <button
          type="button"
          onMouseUp={() =>
            dispatch({ type: 'SET_LISTBOX_STATUS', value: false })
          }
          hidden={!listboxStatus}
          className="fixed top-0 left-0 h-screen w-screen"
        />
      </div>
    )
  },
)

export default memo(Select)
