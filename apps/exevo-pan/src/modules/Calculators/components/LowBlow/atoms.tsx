/* eslint-disable jsx-a11y/label-has-associated-control */
export const Group = (args: JSX.IntrinsicElements['div']) => (
  <div
    {...args}
    className="border-separator border-1 grid gap-1.5 rounded-md border-solid p-6"
  />
)

Group.Title = (args: JSX.IntrinsicElements['span']) => (
  <span {...args} className="mb-3 font-normal" />
)

export const Result = (args: JSX.IntrinsicElements['p']) => (
  <p {...args} className="text-s mt-1.5 font-normal" />
)
