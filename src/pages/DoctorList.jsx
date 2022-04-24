import {
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react'
import { useQuery } from 'react-query'

const useDoctors = () => {
  return useQuery('doctors1', () =>
    fetch('http://localhost:3001/doctors').then(res => res.json())
  )
}

function DoctorCount() {
  const queryInfo = useDoctors()

  return <h4>Numero de Doctores: {queryInfo.data?.length}</h4>
}

function DoctorList() {
  const queryInfo = useDoctors()

  if (queryInfo.isLoading) return 'Cargando...'
  if (queryInfo.error) return queryInfo.error.message

  console.log(queryInfo)

  return (
    <div>
      {queryInfo.isLoading ? (
        'Loading...'
      ) : (
        <TableContainer>
          <Table variant='simple'>
            <Thead>
              <Tr>
                <Th>Id</Th>
                <Th>DPI</Th>
                <Th>Nombre</Th>
                <Th>Apellido</Th>
                <Th>Telefono</Th>
              </Tr>
            </Thead>
            <Tbody>
              {queryInfo.data.map(ticket => (
                <Tr key={ticket.id}>
                  <Td>{ticket.id}</Td>
                  <Td>{ticket.dpi}</Td>
                  <Td>{ticket.name}</Td>
                  <Td>{ticket.lastName}</Td>
                  <Td>{ticket.phoneNumber}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      )}
    </div>
  )
}

export default function DoctorTest() {
  return (
    <>
      <Text fontSize='5xl'>Doctor List</Text>
      <DoctorCount />
      <DoctorList />
    </>
  )
}
