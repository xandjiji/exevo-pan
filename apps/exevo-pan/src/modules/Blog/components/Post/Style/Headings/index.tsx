/* eslint-disable jsx-a11y/heading-has-content */
import clsx from 'clsx'
import styles from './styles.module.css'

export const h1 = (args: JSX.IntrinsicElements['h1']) => (
  <h1 {...args} className={styles.title} />
)
export const h2 = ({ className, ...props }: JSX.IntrinsicElements['h2']) => (
  <h2 {...props} className={clsx(styles.title, className)} />
)
export const h3 = (args: JSX.IntrinsicElements['h3']) => (
  <h3 {...args} className={styles.title} />
)
export const h4 = (args: JSX.IntrinsicElements['h4']) => (
  <h4 {...args} className={styles.title} />
)
export const h5 = (args: JSX.IntrinsicElements['h5']) => (
  <h5 {...args} className={styles.title} />
)
export const h6 = (args: JSX.IntrinsicElements['h6']) => (
  <h6 {...args} className={styles.title} />
)
