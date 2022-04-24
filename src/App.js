import { ChakraProvider, Container } from '@chakra-ui/react'
import DoctorList from 'pages/DoctorList'
import Header from 'pages/Header'
import HomePage from 'pages/HomePage'
import PatientList from 'pages/PatientList'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

const queryClient = new QueryClient()

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider>
        <Router>
          <Header />
          <Container maxW='container.xl'>
            <Routes>
              <Route path='/' element={<HomePage />} />
              <Route path='doctors' element={<DoctorList />} />
              <Route path='patients' element={<PatientList />} />
            </Routes>
          </Container>
        </Router>
      </ChakraProvider>
      <ReactQueryDevtools initialIsOpen={false}></ReactQueryDevtools>
    </QueryClientProvider>
  )
}
