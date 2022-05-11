/* eslint-disable jsx-a11y/label-has-associated-control */
export const Group = (args: JSX.IntrinsicElements['div']) => (
  <div
    {...args}
    className="border-separator border-1 grid gap-[6px] rounded-md border-solid p-6"
  />
)

Group.Title = (args: JSX.IntrinsicElements['span']) => (
  <span {...args} className="mb-1 font-normal" />
)

export const Label = (args: JSX.IntrinsicElements['label']) => (
  <label {...args} className="text-tsm" />
)

export const Result = (args: JSX.IntrinsicElements['p']) => (
  <p {...args} className="text-s mt-[6px] font-normal" />
)
