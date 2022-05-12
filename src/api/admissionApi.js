import { api } from 'api'

export const getPatientAdmissions = id => api(`patients/${id}/admissions`)

export const saveAdmission = admission =>
  api(`admissions${admission.id ? `/${admission.id}` : ''}`, {
    method: admission.id ? 'PUT' : 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(admission),
  })

export const deleteAdmission = async id =>
  api(`admissions/${id}`, {
    method: 'DELETE',
  })
