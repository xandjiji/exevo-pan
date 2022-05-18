import clsx from 'clsx'
import { Skeleton } from 'components/Atoms'
import { LabeledTextBox as BaseLabeledTextBox } from '../Parts/atoms'

export const Flex = ({ className, ...props }: JSX.IntrinsicElements['div']) => (
  <div className={clsx('flex h-full items-center', className)} {...props} />
)

export const LabelledFlex: typeof Flex = (args) => (
  <Flex className="w-full" {...args} />
)

export const Text = ({ className, ...props }: JSX.IntrinsicElements['div']) => (
  <Skeleton className={clsx('h-3', className)} {...props} />
)

export const LabeledTextBox: typeof BaseLabeledTextBox = (args) => (
  <BaseLabeledTextBox
    className="h-9"
    style={{ alignItems: 'center' }}
    {...args}
  />
)

export const ImbuementFlex: typeof Flex = (args) => (
  <Flex className="gap-1" {...args} />
)

export const ImbuementsIcon = () => <Skeleton className="h-[18px] w-[18px]" />
