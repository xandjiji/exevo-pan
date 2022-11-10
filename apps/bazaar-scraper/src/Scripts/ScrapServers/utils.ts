import { HttpClient } from 'services'
import { retryWrapper } from 'utils'

const SERVER_LIST_URL = 'https://www.tibia.com/community/?subtopic=worlds'

export const fetchServerPage = retryWrapper(() =>
  HttpClient.getHtml(SERVER_LIST_URL),
)
