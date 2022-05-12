import { ChakraProvider, Container } from '@chakra-ui/react'
import Header from 'components/Header'
import { ModalProvider } from 'context/ModalContext'
import AreaProfilePage from 'pages/AreaProfilePage'
import AreasPage from 'pages/AreasPage'
import DoctorProfile from 'pages/DoctorProfile'
import DoctorsPage from 'pages/DoctorsPage'
import HomePage from 'pages/HomePage'
import PatientProfilePage from 'pages/PatientProfile'
import PatientPage from 'pages/PatientsPage'
import queryClient from 'queryClient'
import { QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider>
        <ModalProvider>
          <Router>
            <Header />
            <Container maxW='container.xl'>
              <Routes>
                <Route path='/' element={<HomePage />} />
                <Route path='doctors' element={<DoctorsPage />} />
                <Route path='doctors/:id' element={<DoctorProfile />} />
                <Route path='patients' element={<PatientPage />} />
                <Route path='patients/:id' element={<PatientProfilePage />} />
                <Route path='areas' element={<AreasPage />} />
                <Route path='areas/:id' element={<AreaProfilePage />} />
              </Routes>
            </Container>
          </Router>
        </ModalProvider>
      </ChakraProvider>
      <ReactQueryDevtools initialIsOpen={false}></ReactQueryDevtools>
    </QueryClientProvider>
  )
}

export default App
