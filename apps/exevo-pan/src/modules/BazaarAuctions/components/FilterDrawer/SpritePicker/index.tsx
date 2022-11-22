import { useTranslations } from 'contexts/useTranslation'
import clsx from 'clsx'
import { memo } from 'react'
import Image from 'next/image'
import { Accordion, Label, ActiveCount } from 'components/Atoms'
import { useAuctions } from '../../../contexts/useAuctions'
import { SpritePickerProps } from './types'

const SpritePicker = ({
  title,
  spriteDirectory,
  directorySuffix = '',
  options,
  filterKey,
  children,
}: SpritePickerProps) => {
  const {
    translations: { homepage },
  } = useTranslations()

  const { filterState, dispatch } = useAuctions()

  const selectedCount = (filterState[filterKey] as Set<string>).size

  return (
    <Accordion
      className="border-separator mt-[-9px] border-solid pb-1.5"
      style={{ borderWidth: 0, borderBottomWidth: 1 }}
      title={
        <Label className="relative flex cursor-pointer items-center gap-1.5 text-left">
          {title}
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
        </Label>
      }
    >
      <div className="flex flex-wrap gap-2">
        {children}
        {options.map((name) => {
          const isChecked = (filterState[filterKey] as Set<string>).has(name)

          return (
            <button
              key={name}
              type="button"
              role="switch"
              title={name}
              aria-checked={isChecked}
              onClick={() =>
                dispatch({
                  type: 'TOGGLE_FILTER_SET',
                  key: filterKey,
                  value: name,
                })
              }
              className={clsx(
                'clickable relative h-14 w-14 select-none rounded-md p-2 transition-colors',
                isChecked ? 'bg-primaryHighlight' : 'bg-primaryVariant',
              )}
            >
              <Image
                alt={name}
                src={`/sprites/${spriteDirectory}/${name}${directorySuffix}.gif`}
                width="64"
                height="64"
                className="pointer-events-none -ml-6 -mt-6"
              />
            </button>
          )
        })}
      </div>
    </Accordion>
  )
}

export default memo(SpritePicker)
