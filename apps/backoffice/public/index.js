const API =
  window.location.hostname === 'localhost'
    ? 'http://localhost:9696/api'
    : '/api'

let highlighted = []

const [, authToken] = window.location.search.split('=')

const today = () => {
  const date = new Date()
  const day = date.getDate().toString().padStart(2, '0')
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const year = date.getFullYear()

  return `${day}/${month}/${year}`
}

const getAuction = (timestamp) =>
  highlighted.find((auction) => auction.timestamp === timestamp)

const toggleLoadingState = () => {
  const loaderElement = document.getElementById('loading-state')
  loaderElement.classList.toggle('active')
}

const afterRequest = async (response) => {
  const logElement = document.getElementById('request-log')

  const { status } = response
  const responseMessage = await response.text()
  const newResponse = `STATUS: ${status} - MESSAGE: ${responseMessage}\n`
  logElement.value += newResponse
  toggleLoadingState()
}

/************* ⏸️ TOGGLE **************/

const toggleAction = (timestamp) => {
  const auction = getAuction(timestamp)

  toggleLoadingState()
  fetch(API, {
    method: 'POST',
    body: JSON.stringify({ ...auction, active: !auction.active, authToken }),
  }).then(afterRequest)
}

const toggleButton = (timestamp) => {
  const auction = getAuction(timestamp)
  return `<button onclick="toggleAction(${timestamp})">${
    auction.active ? '⏸️' : '☑️'
  }</button>`
}

/************* ❌ DELETE **************/

const deleteAction = (timestamp) => {
  const confirmed = confirm('Are you sure you want to DELETE?')

  if (confirmed) {
    toggleLoadingState()
    fetch(API, {
      method: 'DELETE',
      body: JSON.stringify({ id: timestamp, authToken }),
    }).then(afterRequest)
  }
}

const deleteButton = (timestamp) =>
  `<button onclick="deleteAction(${timestamp})">❌</button>`

/************* 📅 DATE **************/

const dateAction = (timestamp) => {
  const { value } = document.getElementById(`${timestamp}-date`)
  if (!value) return

  const [year, month, day] = value.split('-')
  const newDate = `${day}/${month}/${year}`

  let auction = getAuction(timestamp)
  const alreadyHasDate = auction.days.some((day) => day === newDate)

  if (alreadyHasDate) {
    auction = {
      ...auction,
      days: auction.days.filter((day) => day !== newDate),
    }
  } else {
    auction = {
      ...auction,
      days: [...auction.days, newDate],
    }
  }

  toggleLoadingState()
  fetch(API, {
    method: 'POST',
    body: JSON.stringify({ ...auction, authToken }),
  }).then(afterRequest)
}

const dateButton = (timestamp) =>
  `<button onclick="dateAction(${timestamp})">📅</button>`

/************* ACTIONS **************/

const actionsTemplate = (timestamp) => {
  let buttons = ''

  buttons += dateButton(timestamp)
  buttons += toggleButton(timestamp)
  buttons += deleteButton(timestamp)

  return buttons
}

const higlightedTemplate = ({ nickname, id, days, timestamp }) => `
<tr>
    <td>${actionsTemplate(timestamp)}</td>
    <td>${id}</td>
    <td>${nickname} - ${new Date(timestamp).toLocaleString()}</td>
    <td class="date-wrapper">${days
      .map(
        (date) =>
          `<span class="${date === today() ? 'today' : ''}">${date}</span>`,
      )
      .join('')}
      <input id="${timestamp}-date" type="date">
    </td>
</tr>
`

fetch(API).then((response) => {
  response.json().then((data) => {
    highlighted = data
      .map(({ metadata }) => JSON.parse(metadata))
      .sort((a, b) => b.timestamp - a.timestamp)

    console.log(highlighted)

    const elements = highlighted.map(higlightedTemplate).join('')

    const tableBody = document.getElementById('highlighted-table-body')
    tableBody.innerHTML = elements
  })
})
