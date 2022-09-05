const API =
  window.location.hostname === 'localhost'
    ? 'http://localhost:9696/api'
    : '/api'

const REVALIDATION_ENDPOINT = 'https://exevopan.com/api/revalidate'

const [, authToken] = window.location.search.split('=')

const buildRevalidationRoute = (route) =>
  `${REVALIDATION_ENDPOINT}?secret=${authToken}${
    route ? `&route=${route}` : ''
  }`

let highlighted = []

const dispatchRevalidation = () => {
  const { value } = document.getElementById('route-input')

  toggleLoadingState()
  fetch(buildRevalidationRoute(value)).finally(toggleLoadingState)
}

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

/************* 👍 CONFIRM **************/

const confirmAction = (timestamp) => {
  const auction = getAuction(timestamp)

  toggleLoadingState()
  fetch(API, {
    method: 'POST',
    body: JSON.stringify({ ...auction, confirmed: true, authToken }),
  }).then(afterRequest)
}

const confirmButton = (timestamp) => {
  const auction = getAuction(timestamp)
  return auction.confirmed
    ? ''
    : `<button onclick="confirmAction(${timestamp})">👍</button>`
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

  buttons += confirmButton(timestamp)
  buttons += dateButton(timestamp)
  buttons += toggleButton(timestamp)
  buttons += deleteButton(timestamp)

  return buttons
}

const higlightedTemplate = ({ nickname, id, days, timestamp }) => `
<tr>
    <td>${actionsTemplate(timestamp)}</td>
    <td><a target="_blank" href="https://www.tibia.com/charactertrade/?subtopic=currentcharactertrades&page=details&auctionid=${id}">${id}</a></td>
    <td>${nickname} - ${new Date(timestamp).toLocaleString('pt-BR', {
  hour12: false,
})}</td>
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

const calculateTotalOrders = (auctions) => {
  const BASE_PRICE = 5
  const BASE_DAY_PRICE = 10

  let totalIncome = 0
  let dayCount = 0
  auctions.forEach(({ active, days }) => {
    const dayAmount = days.length
    dayCount += dayAmount
    if (active && dayAmount > 0) {
      if (dayAmount >= 5) return (totalIncome += dayAmount * BASE_DAY_PRICE)
      totalIncome += BASE_PRICE + dayAmount * BASE_DAY_PRICE
    }
  })

  return { dayCount, totalIncome }
}

const calculateMonthlyAverage = (value) => {
  const DAYS_IN_A_MONTH = 30
  return (value / DAYS_IN_A_MONTH).toFixed(2)
}

const paintAverages = ({ dayCount, totalIncome }) => {
  document.getElementById('month-element').innerHTML = `R$ ${totalIncome}`
  document.getElementById(
    'average-element',
  ).innerHTML = `R$ ${calculateMonthlyAverage(totalIncome)}`
  document.getElementById('days-element').innerHTML =
    calculateMonthlyAverage(dayCount)
}

fetch(API).then((response) => {
  response.json().then((data) => {
    highlighted = data.sort((a, b) => b.timestamp - a.timestamp)

    console.log(highlighted)

    paintAverages(calculateTotalOrders(highlighted))

    const elements = highlighted.map(higlightedTemplate).join('')

    const tableBody = document.getElementById('highlighted-table-body')
    tableBody.innerHTML = elements
  })
})
