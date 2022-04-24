const SERVER_URL = 'http://localhost:3001'

export const api = service =>
  fetch(`${SERVER_URL}/${service}`).then(res => res.json())
