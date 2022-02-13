const createHeader = () => {
  const headers = new Headers()
  headers.set('Content-Type', 'application/json')
  headers.set('Access-Control-Allow-Origin', '*')
  headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE')
  return headers
}

export const headers = createHeader()
