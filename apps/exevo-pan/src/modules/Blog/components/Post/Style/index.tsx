import clsx from 'clsx'
import codeStyles from './Code/styles.module.css'

const ContentWrapper = (args: JSX.IntrinsicElements['main']) => (
  <main
    {...args}
    className={clsx(
      codeStyles.contentWrapper,
      'card inner-padding z-1 text-onSurface relative flex w-full max-w-full shrink-0 flex-col gap-4 py-8 text-base font-light leading-relaxed transition-colors',
    )}
  />
)

export default ContentWrapper

export * from './Lists'
export { default as h2 } from './HeadingSection'
export { default as table } from './Table'
export * from './Blockquote'
export * from './Code'
export * from './Headings'
export * from './Hr'
export * from './Link'
export * from './Small'
