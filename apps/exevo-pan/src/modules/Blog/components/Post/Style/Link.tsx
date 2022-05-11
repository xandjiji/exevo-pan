/* eslint-disable jsx-a11y/anchor-has-content */

export const a = (args: JSX.IntrinsicElements['a']) => (
  <a
    {...args}
    className="text-primaryHighlight selection:bg-primary selection:text-onPrimary bg from-primaryHighlight bg-gradient-to-r bg-left-bottom bg-no-repeat transition-all hover:opacity-75"
    style={{ backgroundSize: '14px 1px' }}
  />
)
