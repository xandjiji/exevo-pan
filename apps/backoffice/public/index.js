const API =
  window.location.hostname === 'localhost'
    ? 'http://localhost:9696/api'
    : '/api'

const deleteAction = (timestamp) => console.log(timestamp)

const actionsTemplate = (timestamp) => `
<button onclick="deleteAction(${timestamp})">❌</button>
`

const higlightedTemplate = ({ nickname, id, days, timestamp }) => `
<tr>
    <td>${actionsTemplate(timestamp)}</td>
    <td>${id}</td>
    <td>${nickname} - ${new Date(timestamp).toLocaleString()}</td>
    <td class="date-wrapper">${days
      .map((date) => `<span>${date}</span>`)
      .join('')}</td>
</tr>
`

fetch(API).then((response) => {
  response.json().then((data) => {
    const highlighted = data
      .map(({ metadata }) => JSON.parse(metadata))
      .sort((a, b) => b.timestamp - a.timestamp)

    const elements = highlighted.map(higlightedTemplate).join('')

    const tableBody = document.getElementById('highlighted-table-body')
    tableBody.innerHTML = elements
  })
})
