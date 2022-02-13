const API =
  window.location.hostname === 'localhost'
    ? 'http://localhost:9696/api'
    : '/api'

let highlighted = []

const getAuction = (timestamp) =>
  highlighted.find((auction) => auction.timestamp === timestamp)

/************* ⏸️ TOGGLE **************/

const toggleAction = (timestamp) => {
  const auction = getAuction(timestamp)

  fetch(API, {
    method: 'POST',
    body: JSON.stringify({ ...auction, active: !auction.active }),
  })
}

const toggleButton = (timestamp) => {
  const auction = getAuction(timestamp)
  return `<button onclick="toggleAction(${timestamp})">${
    auction.active ? '⏸️' : '▶️'
  }</button>`
}

/************* ❌ DELETE **************/

const deleteAction = (timestamp) =>
  fetch(API, {
    method: 'DELETE',
    body: JSON.stringify({ id: timestamp }),
  })

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

  fetch(API, {
    method: 'POST',
    body: JSON.stringify(auction),
  })
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
      .map((date) => `<span>${date}</span>`)
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
