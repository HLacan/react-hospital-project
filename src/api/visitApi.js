import { api } from 'api'

export const getPatientVisits = id => api(`patients/${id}/visits`)

export const saveVisit = visit =>
  api(`visits${visit.id ? `/${visit.id}` : ''}`, {
    method: visit.id ? 'PUT' : 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(visit),
  })

export const deleteVisit = async id =>
  api(`visits/${id}`, {
    method: 'DELETE',
  })
