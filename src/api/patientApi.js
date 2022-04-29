import { api } from 'api'

export const getPatients = () => api('patients')

export const getPatient = id => api(`patients/${id}`)
