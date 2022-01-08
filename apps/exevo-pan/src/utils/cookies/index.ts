export const setCookie = (
  name: string,
  value: string,
  maxAge: number,
): void => {
  document.cookie = `${name}=${value ?? ''}; max-age=${maxAge}; path=/`
}

export const getCookie = (name: string): string | undefined => {
  const nameEQ = `${name}=`
  const ca = document.cookie.split(';')
  for (let i = 0; i < ca.length; i += 1) {
    let c = ca[i]
    while (c.charAt(0) === ' ') c = c.substring(1, c.length)
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length)
  }
  return undefined
}
