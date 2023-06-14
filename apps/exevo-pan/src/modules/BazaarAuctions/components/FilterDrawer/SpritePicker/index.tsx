import { useState, useMemo, memo } from 'react'
import { useTranslations } from 'contexts/useTranslation'
import clsx from 'clsx'
import Image from 'next/image'
import { Accordion, Label, ActiveCount, Input } from 'components/Atoms'
import { useAuctions } from '../../../contexts/useAuctions'
import { ExevoProExclusive } from '../atoms'
import { SpritePickerProps } from './types'

const SpritePicker = ({
  isPro = false,
  title,
  spriteDirectory,
  directorySuffix = '',
  options,
  searchPlaceholder,
  filterKey,
  children,
}: SpritePickerProps) => {
  const { homepage } = useTranslations()

  const [search, setSearch] = useState('')

  const filteredOptions = useMemo(() => {
    if (!search) return options

    const insensitiveTerm = search.toLowerCase()
    return options.filter((name) =>
      name.toLowerCase().includes(insensitiveTerm),
    )
  }, [search, options])

  const { filterState, dispatch } = useAuctions()

  const selectedCount = (filterState[filterKey] as Set<string>).size

  return (
    <Accordion
      className="border-separator mt-[-9px] border-solid pb-1.5"
      style={{ borderWidth: 0, borderBottomWidth: 1 }}
      title={
        <Label
          className={clsx(
            'relative flex cursor-pointer items-center gap-1.5 text-left',
            isPro && 'text-rare !font-bold',
          )}
        >
          {title}
          {isPro ? (
            <ActiveCount
              aria-label={`${selectedCount} ${
                homepage.FilterDrawer.SpritePicker[
                  selectedCount === 1 ? 'item' : 'items'
                ]
              }`}
              aria-hidden={!selectedCount}
              className="pointer-events-none"
            >
              {selectedCount}
            </ActiveCount>
          ) : (
            <ExevoProExclusive />
          )}
        </Label>
      }
    >
      <Input
        allowClear
        label={homepage.FilterDrawer.SpritePicker.search}
        className="mb-4 max-w-[180px]"
        placeholder={searchPlaceholder}
        onChange={(e) => setSearch(e.target.value)}
        disabled={!isPro}
      />
      <div className="flex flex-wrap gap-2">
        {children}
        {filteredOptions.map((name) => {
          const isChecked = (filterState[filterKey] as Set<string>).has(name)

          return (
            <button
              key={name}
              type="button"
              role="switch"
              title={name}
              aria-checked={isChecked}
              disabled={!isPro}
              onClick={() =>
                dispatch({
                  type: 'TOGGLE_FILTER_SET',
                  key: filterKey,
                  value: name,
                })
              }
              className={clsx(
                'focus:border-primaryHighlight relative h-14 w-14 select-none rounded-md border-2 border-solid border-transparent p-2 outline-none transition-colors',
                isPro ? 'clickable' : 'cursor-not-allowed',
                isPro
                  ? isChecked
                    ? 'bg-primaryHighlight'
                    : 'bg-primaryVariant'
                  : 'bg-separator/50',
              )}
            >
              <Image
                alt={name}
                src={`/sprites/${spriteDirectory}/${name}${directorySuffix}.gif`}
                width="64"
                height="64"
                className="pixelated pointer-events-none -ml-6 -mt-6"
              />
            </button>
          )
        })}
      </div>
    </Accordion>
  )
}

export default memo(SpritePicker)
