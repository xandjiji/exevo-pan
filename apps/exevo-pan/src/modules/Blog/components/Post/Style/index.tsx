const ContentWrapper = (args: JSX.IntrinsicElements['main']) => (
  <main
    {...args}
    className="card inner-padding z-1 text-onSurface transition-colors' relative flex w-full max-w-full shrink-0 flex-col gap-4 py-8 text-base font-light leading-relaxed"
  />
)

export default ContentWrapper

export { default as h2 } from './HeadingSection'
export * from './Blockquote'
export * from './Code'
export * from './Headings'
export * from './Hr'
export * from './Link'
export * from './Lists'
export * from './Small'
export * from './Table'
