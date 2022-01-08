const createHeader = () => {
  const headers = new Headers()
  headers.set('Content-Type', 'application/json')
  headers.set('Access-Control-Allow-Origin', '*')
  headers.set('Access-Control-Allow-Headers', 'Content-Type')
  headers.set('Access-Control-Allow-Methods', 'POST,OPTIONS')
  headers.set('Access-Control-Max-Age', '120')
  return headers
}

export const headers = createHeader()
