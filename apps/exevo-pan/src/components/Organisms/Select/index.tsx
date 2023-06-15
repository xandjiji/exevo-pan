/* eslint-disable jsx-a11y/control-has-associated-label */
import {
  forwardRef,
  useReducer,
  useRef,
  useCallback,
  useMemo,
  useId,
  memo,
} from 'react'
import clsx from 'clsx'
import { Popover, Listbox, Option, Label, FormError } from 'components/Atoms'
import { ChevronDownIcon } from 'assets/svgs'
import { useSharedRef } from 'hooks'
import SelectReducer from './reducer'
import useValueRef from './useValueRef'
import useTypeSearch from './useTypeSearch'
import { findOptionIndexByValue } from './utils'
import { SelectProps, Value } from './types'

const Select = forwardRef<HTMLInputElement, SelectProps>(
  (
    {
      id: idProp,
      className,
      style,
      'aria-label': ariaLabel,
      placeholder,
      label,
      name,
      defaultValue: defaultValueProp,
      value: propValue,
      onChange,
      disabled,
      error = false,
      options,
      ...props
    },
    ref: React.Ref<HTMLInputElement>,
  ) => {
    const listboxId = useId()
    const uuid = useId()
    const selectId = idProp ?? uuid
    const errorId = useId()
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

    const { value, valueRef } = useValueRef(propValue ?? innerValue)
    const selectedIndex = useMemo(
      () => findOptionIndexByValue(options, value),
      [value, options],
    )

    const handleSearch = useTypeSearch(dispatch, options)

    const handleKeyboard: React.KeyboardEventHandler<HTMLDivElement> =
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
              event.preventDefault()
              break
            default:
              break
          }
        },
        [options],
      )

    return (
      <div
        className={clsx(
          'child:w-full text-tsm relative select-none',
          disabled && 'child:cursor-default',
          className,
        )}
        style={style}
      >
        <Label className="mb-2" htmlFor={selectId}>
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
              selectedIndex={new Set([selectedIndex])}
              onSelectOption={useCallback((option: Option) => {
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
            id={selectId}
            aria-disabled={disabled}
            aria-label={accessibleLabel}
            role="combobox"
            aria-expanded={listboxStatus}
            aria-controls={listboxId}
            tabIndex={disabled ? -1 : 0}
            onClick={
              disabled
                ? undefined
                : () => dispatch({ type: 'SET_LISTBOX_STATUS' })
            }
            onKeyDown={disabled ? undefined : handleKeyboard}
            onKeyPress={disabled ? undefined : handleSearch}
            className={clsx(
              'text-tsm border-1 group flex h-9 w-full items-center rounded-md border-solid py-2.5 px-4 outline-none transition-all',
              error
                ? 'border-red'
                : 'border-separator focus-within:border-primary',
              disabled
                ? 'text-onSurface/50 bg-separator/50 pointer-events-none'
                : 'text-onSurface bg-surface',
            )}
            {...props}
          >
            <div role="textbox" aria-label={accessibleLabel} aria-readonly>
              {options[selectedIndex]?.name ?? placeholder}
            </div>
            <ChevronDownIcon
              className={clsx(
                'ml-auto -mr-2 h-6 w-6 shrink-0 transition-colors',
                disabled ? 'fill-onSurface/50' : 'fill-separator',
                !disabled && error
                  ? 'group-focus-within:fill-red'
                  : 'group-focus-within:fill-primaryHighlight',
              )}
            />
          </div>
        </Popover>
        <FormError
          id={errorId}
          error={error}
          className="absolute top-[calc(100%+4px)] left-0"
        />
        <input
          ref={innerRef}
          name={name}
          type="hidden"
          aria-label={accessibleLabel}
          value={value}
          disabled={disabled}
          onInput={useCallback(
            (event: React.ChangeEvent<HTMLInputElement>) => {
              if (event.target.value === dispatchedValue.current) return
              // eslint-disable-next-line no-param-reassign
              event.target.value = dispatchedValue.current.toString()
              onChange?.(event as React.ChangeEvent<HTMLInputElement>)
            },
            [onChange],
          )}
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
