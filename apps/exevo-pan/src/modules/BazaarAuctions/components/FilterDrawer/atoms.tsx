import clsx from 'clsx'
import { Input as BaseInput, Chip as BaseChip } from 'components/Atoms'
import { AutocompleteInput as BaseAutocompleteInput } from 'components/Organisms'
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
