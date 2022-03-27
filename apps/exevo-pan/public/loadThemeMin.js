!(function (t) {
  const e = 'light' === t ? '#3F51B5' : '#9857E7'
  document.documentElement.setAttribute('data-theme', t),
    document.getElementById('address-bar-1')?.setAttribute('content', e),
    document.getElementById('address-bar-2')?.setAttribute('content', e)
})(
  (function () {
    if ('undefined' != typeof window) {
      const t = window.localStorage.getItem('data-theme')
      if (t) return t
      if (window.matchMedia('(prefers-color-scheme: dark)').matches)
        return 'dark'
    }
    return 'light'
  })(),
)
