export const blockquote = (args: JSX.IntrinsicElements['blockquote']) => (
  <blockquote
    {...args}
    className="border-primary bg-background text-primaryHighlight child:font-normal m-0 rounded border-solid py-4 px-6 text-[19px] tracking-wide"
    style={{ borderWidth: 0, borderLeftWidth: 6 }}
  />
)
