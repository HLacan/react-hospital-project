const doctors = [
  {
    id: 1,
    dpi: '1234567890101',
    name: 'Jeorge',
    lastName: 'Herrera',
    phoneNumber: '12345844',
  },
  {
    id: 2,
    dpi: '9876543210101',
    name: 'Herbert',
    lastName: 'Lacan',
    phoneNumber: '78549824',
  },
]

const patients = [
  {
    id: 1,
    name: 'Juan',
    lastName: 'Cataluño',
    dpi: '0101',
    birthday: '2001-01-27',
    phoneNumber: '11111111',
    status: 'discharged',
  },
  {
    id: 2,
    name: 'Margarita',
    lastName: 'Saenz',
    dpi: '0102',
    birthday: '2020-02-19',
    phoneNumber: '22222222',
    status: 'admitted',
  },
]

const areas = [
  {
    id: 1,
    name: 'surgery',
  },
  {
    id: 2,
    name: 'operating room',
  },
]

const beds = [
  {
    id: 1,
    status: 'libre',
    areaId: 1,
  },
  {
    id: 2,
    status: 'libre',
    areaId: 1,
  },
  {
    id: 3,
    status: 'libre',
    areaId: 1,
  },
  {
    id: 4,
    status: 'libre',
    areaId: 2,
  },
  {
    id: 5,
    status: 'libre',
    areaId: 2,
  },
  {
    id: 6,
    status: 'libre',
    areaId: 2,
  },
]

const visits = [
  {
    id: 1,
    visitDate: '2001-01-27',
    reason: 'dolor de garganta',
    diagnostic: 'gripe',
    treatment: 'pastillas',
    doctorId: 1,
    patientId: 1,
  },
  {
    id: 2,
    visitDate: '2015-05-31',
    reason: 'dolor de estomago',
    diagnostic: 'gastritis',
    treatment: 'antiacido',
    doctorId: 2,
    patientId: 2,
  },
]

const admissions = [
  {
    id: 1,
    admissionDate: '2017-12-26',
    reason: 'parto',
    bedId: 1,
    patientId: 2,
    doctorId: 1,
  },
  {
    id: 2,
    admissionDate: '2014-07-10',
    reason: 'apendicitis',
    bedId: 2,
    patientId: 1,
    doctorId: 2,
  },
  {
    id: 3,
    admissionDate: '2014-08-15',
    reason: 'gastritis cronica',
    bedId: 1,
    patientId: 1,
    doctorId: 1,
  },
]

module.exports = {
  doctors,
  patients,
  visits,
  admissions,
  beds,
  areas,
}
