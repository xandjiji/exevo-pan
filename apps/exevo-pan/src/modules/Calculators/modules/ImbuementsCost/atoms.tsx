import { Tabs } from 'components/Atoms'

export const LabelWrapper = (args: JSX.IntrinsicElements['div']) => (
  <div className="flex items-center gap-1" {...args} />
)

export const Panel: typeof Tabs.Panel = (args) => (
  <Tabs.Panel className="grid gap-4 pt-2" {...args} />
)
