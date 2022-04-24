const SERVER_URL = 'http://localhost:3001'

export const api = service =>
  fetch(`${SERVER_URL}/doctors`).then(res => res.json())
