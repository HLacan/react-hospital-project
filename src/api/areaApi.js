import { api } from 'api'

export const getAreas = () => api('areas')

export const getArea = id => api(`areas/${id}`)

export const saveArea = area =>
  api(`areas${area.id ? `/${area.id}` : ''}`, {
    method: area.id ? 'PUT' : 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(area),
  })

export const deleteArea = async id =>
  api(`areas/${id}`, {
    method: 'DELETE',
  })
