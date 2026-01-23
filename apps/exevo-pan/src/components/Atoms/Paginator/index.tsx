/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { useTranslations } from 'contexts/useTranslation'
import { formatNumberWithCommas, clampValue, debounce } from 'utils'
import { cloneElement, memo, useMemo, useState } from 'react'
import clsx from 'clsx'
import { ChevronRightIcon, LastIcon } from 'assets/svgs'
import usePagination from './usePagination'
import { IconProps, PaginatorProps } from './types'

const Icon = ({ icon, disabled }: IconProps) =>
  cloneElement(icon, {
    className: clsx(
      'w-8 h-8 fill-onSurface transition-opacity',
      disabled && 'opacity-40',
    ),
  })

const Cursor = ({ className, ...props }: JSX.IntrinsicElements['button']) => (
  <button
    className={clsx(
      'h-8 rounded',
      props.disabled ? 'cursor-not-allowed' : 'clickable',
      className,
    )}
    type="button"
    {...props}
  />
)

const Paginator = ({
  className,
  currentPage: currentPageProp,
  pageSize = 1,
  totalItems,
  onChange,
  noItemsMessage = 'No items',
  ...props
}: PaginatorProps) => {
  const { common } = useTranslations()

  const [currentPage, setCurrentPage] = useState<number>(currentPageProp ?? 1)
  const derivedCurrentPage = currentPageProp ?? currentPage

  const { hasPrev, hasNext, startOffset, endOffset, pageCount } = usePagination(
    derivedCurrentPage,
    pageSize,
    totalItems,
  )

  const trackerDisplay =
    totalItems > 0
      ? `${formatNumberWithCommas(startOffset)} - ${formatNumberWithCommas(
          endOffset,
        )} ${common.Of} ${formatNumberWithCommas(totalItems)}`
      : noItemsMessage

  const changePage = debounce((newPage: number) => {
    setCurrentPage(newPage)
    onChange?.(newPage)
  }, 0)

  const handleKeyPress = (event: React.KeyboardEvent) => {
    const { ctrlKey, shiftKey } = event
    const increment = 1 * (+!ctrlKey || 10) * (+!shiftKey || 100)
    const newPage = {
      ArrowRight: derivedCurrentPage + increment,
      ArrowLeft: derivedCurrentPage - increment,
    }[event.code]

    if (newPage) {
      event.preventDefault()
      changePage(clampValue(newPage, [1, pageCount]))
    }
  }

  return (
    <div
      tabIndex={0}
      onKeyDown={handleKeyPress}
      className={clsx('text-right', className)}
      {...props}
    >
      <span className="text-tsm text-onSurface mb-2 block tracking-wider">
        {trackerDisplay}
      </span>

      <div className="flex gap-4">
        <Cursor
          aria-label={common.Paginator.FirstLabel}
          disabled={!hasPrev}
          onClick={() => changePage(1)}
        >
          <Icon
            disabled={!hasPrev}
            icon={<LastIcon style={{ transform: 'rotate(180deg)' }} />}
          />
        </Cursor>
        <Cursor
          aria-label={common.Paginator.PreviousLabel}
          disabled={!hasPrev}
          onClick={() => changePage(derivedCurrentPage - 1)}
        >
          <Icon
            disabled={!hasPrev}
            icon={<ChevronRightIcon style={{ transform: 'rotate(180deg)' }} />}
          />
        </Cursor>

        <Cursor
          aria-label={common.Paginator.NextLabel}
          disabled={!hasNext}
          onClick={() => changePage(derivedCurrentPage + 1)}
        >
          <Icon disabled={!hasNext} icon={<ChevronRightIcon />} />
        </Cursor>
        <Cursor
          aria-label={common.Paginator.LastLabel}
          disabled={!hasNext}
          onClick={() => changePage(pageCount)}
        >
          <Icon disabled={!hasNext} icon={<LastIcon />} />
        </Cursor>
      </div>
    </div>
  )
}

export default memo(Paginator)
