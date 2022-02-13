const API =
  window.location.hostname === 'localhost'
    ? 'http://localhost:9696/api'
    : '/api'

fetch(API).then((response) => {
  response.json().then((data) => {
    const highlighted = data.map(({ metadata }) => JSON.parse(metadata))
    console.log(highlighted)
  })
})
