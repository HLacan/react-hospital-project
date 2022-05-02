import { api } from 'api'

export const getPatientVisits = id => api(`patients/${id}/visits`)
