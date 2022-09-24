import { memo, useState, useEffect, useMemo } from 'react'
import { useRouter } from 'next/router'
import { useTranslations } from 'contexts/useTranslation'
import { LoadingAlert } from 'components/Atoms'
import { Select } from 'components/Organisms'
import { debounce } from 'utils'
import { routes } from 'Constants'
import styles from './styles.module.css'
import { ServerNavigationProps } from './types'

const DEBOUNCE_DELAY = 250

const ServerNavigation = ({
  currentServer,
  activeServers,
}: ServerNavigationProps) => {
  const {
    translations: { common },
  } = useTranslations()

  const [isLoading, setIsLoading] = useState(false)

  const { push, events } = useRouter()

  useEffect(() => {
    const setLoading = () => setIsLoading(true)
    const setLoaded = () => setIsLoading(false)

    events.on('routeChangeStart', setLoading)
    events.on('routeChangeComplete', setLoaded)
    events.on('routeChangeError', setLoaded)

    return () => {
      events.off('routeChangeStart', setLoading)
      events.off('routeChangeComplete', setLoaded)
      events.off('routeChangeError', setLoaded)
    }
  }, [events])

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
      {isLoading && <LoadingAlert>{common.LoadingState}</LoadingAlert>}
      <Select
        label="Current server:"
        options={activeServers.map((server) => ({
          name: server,
          value: server,
        }))}
        defaultValue={currentServer}
        onChange={debouncedNav}
        noAlert
        className={styles.select}
      />
    </section>
  )
}

export default memo(ServerNavigation)
