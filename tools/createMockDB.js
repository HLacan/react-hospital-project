const fs = require('fs')
const path = require('path')
const mockData = require('./mockData')

const { doctors, patients, visits, beds, areas, admissions } = mockData
const data = JSON.stringify({
  doctors,
  patients,
  visits,
  beds,
  areas,
  admissions,
})
const filepath = path.join(__dirname, 'db.json')

fs.writeFile(filepath, data, function (err) {
  err ? console.log(err) : console.log('Mock DB created!')
})
