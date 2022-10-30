export const pre = (args: JSX.IntrinsicElements['pre']) => (
  <pre {...args} className="pre m-0" />
)

/* changes made here should also be added to `.contentWrapper` class */
export const code = (args: JSX.IntrinsicElements['code']) => (
  <code {...args} className="code text-s py-0.5 px-2 tracking-wider" />
)
