export const pre = (args: JSX.IntrinsicElements['pre']) => (
  <pre
    {...args}
    className="child:custom-scrollbar child:text-s child:!m-0 child:w-full child:overflow-auto child:!py-4 child:!px-6"
  />
)

export const code = (args: JSX.IntrinsicElements['code']) => (
  <code {...args} className="code text-s py-0.5 px-2 tracking-wider" />
)
