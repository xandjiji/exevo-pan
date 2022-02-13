const createHeader = () => {
  const headers = new Headers()
  headers.set('Content-Type', 'application/json')
  headers.set('Access-Control-Allow-Origin', '*')
  return headers
}

export const headers = createHeader()
