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
    birthday: '01/01/2001',
    phoneNumber: '11111111',
  },
  {
    id: 2,
    name: 'Margarita',
    lastName: 'Saenz',
    dpi: '0102',
    birthday: '02/02/2002',
    phoneNumber: '22222222',
  },
]

const floors = [
  {
    id: 1,
    name: 'surgery',
    beds: '10',
  },
  {
    id: 2,
    name: 'operating room',
    beds: '5',
  },
]

const beds = [
  {
    id: 1,
    floorId: 1,
  },
  {
    id: 2,
    floorId: 1,
  },
  {
    id: 3,
    floorId: 1,
  },
  {
    id: 4,
    floorId: 2,
  },
  {
    id: 5,
    floorId: 2,
  },
  {
    id: 6,
    floorId: 2,
  },
]

const histories = [
  {
    id: 1,
    arrivalDate: '03/04/2022',
    departureDate: '03/05/2022',
    patientId: 1,
  },
  {
    id: 2,
    arrivalDate: '01/02/2021',
    departureDate: '01/03/2021',
    patientId: 1,
  },
  {
    id: 3,
    arrivalDate: '01/01/2020',
    departureDate: '01/02/2020',
    patientId: 2,
  },
  {
    id: 4,
    arrivalDate: '05/03/2019',
    departureDate: '05/04/2019',
    patientId: 2,
  },
]

const patientBeds = [
  {
    id: 1,
    arrivalDate: '03/04/2022',
    bedId: 1,
    historyId: 1,
  },
  {
    id: 2,
    arrivalDate: '01/01/2020',
    bedId: 3,
    historyId: 3,
  },
]

const visits = [
  {
    id: 1,
    diagnostic: 'flu',
    doctorId: 1,
    patientBedId: 1,
  },
  {
    id: 2,
    diagnostic: 'broken bone',
    doctorId: 2,
    patientBedId: 3,
  },
]

module.exports = {
  doctors,
  patients,
  visits,
  histories,
  patientBeds,
  beds,
  floors,
}
