const ContentWrapper = (args: JSX.IntrinsicElements['main']) => (
  <main
    {...args}
    className="content-wrapper card inner-padding z-1 text-onSurface xs:w-full xs:max-w-full xs:mx-0 relative -mx-5 flex w-[calc(100%+40px)] shrink-0 flex-col gap-4 py-8 text-base font-light leading-relaxed transition-colors"
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
