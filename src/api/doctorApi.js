import { api } from 'api'

export const getDoctors = () => api('doctors')

export const getDoctor = id => api(`doctors/${id}`)

export const saveDoctor = doctor =>
  api(`doctors${doctor.id ? `/${doctor.id}` : ''}`, {
    method: doctor.id ? 'PUT' : 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(doctor),
  })

export const deleteDoctor = async id =>
  api(`doctors/${id}`, {
    method: 'DELETE',
  })
