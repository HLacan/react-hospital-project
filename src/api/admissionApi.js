import { api } from 'api'

export const getPatientAdmissions = id => api(`patients/${id}/admissions`)
