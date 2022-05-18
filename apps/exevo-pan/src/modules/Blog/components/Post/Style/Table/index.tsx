import clsx from 'clsx'
import styles from './styles.module.css'

export const table = (props: React.HTMLAttributes<HTMLTableElement>) => (
  <div className="custom-scrollbar mx-auto max-w-full overflow-auto rounded-t-md transition-colors">
    <table
      {...props}
      className={clsx(styles.table, 'max-w-full border-collapse')}
    />
  </div>
)
