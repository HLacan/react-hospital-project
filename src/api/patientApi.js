import { api } from 'api'

export const getPatients = () => api('patients')

export const getPatient = id => api(`patients/${id}`)

export const savePatient = patient =>
  api(`patients${patient.id ? `/${patient.id}` : ''}`, {
    method: patient.id ? 'PUT' : 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(patient),
  })

export const deletePatient = async id =>
  api(`patients/${id}`, {
    method: 'DELETE',
  })
