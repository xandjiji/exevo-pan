import { LabeledTextBox } from 'components/Atoms'

export const Title = (args: JSX.IntrinsicElements['span']) => (
  <span {...args} className="mb-3 font-normal" />
)

export const LabeledCard: typeof LabeledTextBox = (args) => (
  <LabeledTextBox
    className="focus-within:border-primaryVariant grid gap-4 transition-colors"
    {...args}
  />
)
