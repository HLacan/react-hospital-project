const SERVER_URL = 'http://localhost:3001'

export const api = async service => {
  await new Promise(resolve => setTimeout(resolve, 3000))
  return fetch(`${SERVER_URL}/${service}`).then(res => res.json())
}
