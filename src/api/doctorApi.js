import { api } from 'api'

export const getDoctors = () => api('doctors')

export const getDoctor = id => api(`doctors/${id}`)
