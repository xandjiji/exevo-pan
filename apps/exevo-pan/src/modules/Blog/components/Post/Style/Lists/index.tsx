import clsx from 'clsx'
import styles from './styles.module.css'

export const ul = (args: JSX.IntrinsicElements['ul']) => (
  <ul {...args} className={styles.list} />
)
export const ol = (args: JSX.IntrinsicElements['ol']) => (
  <ol {...args} className={clsx(styles.list, styles.orderedList)} />
)
