import clsx from 'clsx'
import { Toaster, ToastIcon, resolveValue } from 'react-hot-toast'

const CustomToaster = () => (
  <Toaster
    position="bottom-right"
    toastOptions={{ duration: 4000 }}
    containerStyle={{ bottom: 64 }}
  >
    {(t) => (
      <div
        className={clsx(
          'card text-tsm text-onSurface border-1 border-separator/50 flex items-center gap-3 rounded-md border-solid px-3 py-2',
          t.visible ? 'animate-slideInRight' : 'animate-implode',
        )}
      >
        {t.type === 'loading' ? (
          <div className="loading-spinner h-5 w-5" />
        ) : (
          <ToastIcon toast={t} />
        )}
        <p>{resolveValue(t.message, t)}</p>
      </div>
    )}
  </Toaster>
)

export default CustomToaster
