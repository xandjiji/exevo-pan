import clsx from 'clsx'
import { useTranslations, templateMessage } from 'contexts/useTranslation'
import NextLink from 'next/link'
import {
  Input as BaseInput,
  Chip as BaseChip,
  ExevoProLink,
} from 'components/Atoms'
import { AutocompleteInput as BaseAutocompleteInput } from 'components/Organisms'
import { routes } from 'Constants'
import { InputProps } from 'components/Atoms/Input/types'
import { ChipProps } from 'components/Atoms/Chip/types'
import { AutocompleteInputProps } from 'components/Organisms/AutocompleteInput/types'

export const Input = ({
  className,
  ...props
}: Omit<InputProps, 'ref'> & AccessibleLabelProps) => (
  <BaseInput className={clsx('max-w-[200px]', className)} {...props} />
)

export const ChipWrapper = ({
  className,
  ...props
}: JSX.IntrinsicElements['div']) => (
  <div
    className={clsx('flex flex-wrap items-center gap-2', className)}
    {...props}
  />
)

export const InputWrapper: typeof ChipWrapper = ({
  className,
  style,
  ...props
}) => (
  <div
    className={clsx('mb-3 flex flex-wrap items-baseline gap-2', className)}
    style={{ gap: 16, ...style }}
    {...props}
  />
)

export const IconChip = ({ className, ...props }: ChipProps) => (
  <BaseChip className={clsx('gap-1.5', className)} {...props} />
)

export const AutocompleteInput = ({
  className,
  ...props
}: AutocompleteInputProps) => (
  <BaseAutocompleteInput
    className={clsx('max-w-[200px]', className)}
    {...props}
  />
)

export const Emoji = ({
  className,
  ...props
}: JSX.IntrinsicElements['span']) => (
  <span role="img" className={clsx('text-tsm ml-1.5', className)} {...props} />
)

export const ExevoProExclusive = () => {
  const { homepage } = useTranslations()

  return (
    <NextLink
      href={routes.EXEVOPRO}
      className="text-onSurface text-xs font-light tracking-wider"
    >
      {templateMessage(homepage.FilterDrawer.exevoProExclusive, {
        exevopro: <ExevoProLink>🚀</ExevoProLink>,
      })}
    </NextLink>
  )
}

export const DoubleColumnInput = ({
  className,
  ...props
}: JSX.IntrinsicElements['div']) => (
  <div
    className={clsx(className, 'grid w-44 grid-cols-2 gap-1.5')}
    {...props}
  />
)
