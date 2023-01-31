import { memo, useMemo } from 'react'
import { useRouter } from 'next/router'
import { useTranslations } from 'contexts/useTranslation'
import { Select } from 'components/Organisms'
import { debounce } from 'utils'
import { routes } from 'Constants'
import styles from './styles.module.css'
import { ServerNavigationProps } from './types'

const DEBOUNCE_DELAY = 250

const ServerNavigation = ({
  currentServer,
  serverOptions,
}: ServerNavigationProps) => {
  const {
    translations: { bosses },
  } = useTranslations()

  const { push } = useRouter()

  const debouncedNav = useMemo(
    () =>
      debounce(
        (e: React.ChangeEvent<HTMLInputElement>) =>
          push(`${routes.BOSS_TRACKER}/${e.target.value}`),
        DEBOUNCE_DELAY,
      ),
    [],
  )

  return (
    <section className="inner-container bg-darkerPrimary z-71 sticky top-[60px] py-3 shadow-md transition-colors">
      <Select
        label={bosses.ServerNavigation.label}
        options={serverOptions}
        defaultValue={currentServer}
        onChange={debouncedNav}
        noAlert
        className={styles.select}
      />
    </section>
  )
}

export default memo(ServerNavigation)
