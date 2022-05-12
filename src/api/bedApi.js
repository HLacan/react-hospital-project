import { api } from 'api'

export const getBeds = () => api('beds')

export const getAreaBeds = id => api(`areas/${id}/beds`)

export const saveBed = bed =>
  api(`beds${bed.id ? `/${bed.id}` : ''}`, {
    method: bed.id ? 'PUT' : 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(bed),
  })

export const deleteBed = async id =>
  api(`beds/${id}`, {
    method: 'DELETE',
  })
