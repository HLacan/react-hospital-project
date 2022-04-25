import {
  Spinner,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react'
import { getDoctors } from 'api/doctorApi'
import { useQuery } from 'react-query'

export default function DoctorList() {
  const {
    isLoading,
    isFetching,
    error,
    data: doctors,
  } = useQuery('doctors', getDoctors)

  return (
    <div>
      <Text fontSize='5xl'>
        Doctor List{' '}
        {isLoading || isFetching ? (
          <Spinner
            thickness='4px'
            speed='0.65s'
            emptyColor='gray.200'
            color='blue.500'
            size='md'
          />
        ) : null}
      </Text>
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
            {doctors?.map(doctor => (
              <Tr
                key={doctor.id}
                _hover={{
                  texDecoration: 'none',
                  bg: 'gray.200',
                  cursor: 'pointer',
                }}
              >
                <Td>{doctor.id}</Td>
                <Td>{doctor.dpi}</Td>
                <Td>{doctor.name}</Td>
                <Td>{doctor.lastName}</Td>
                <Td>{doctor.phoneNumber}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
      {error ? <pre>error.message</pre> : null}
    </div>
  )
}

// function DoctorCount() {
//   const queryInfo = useDoctors()

//   return <h4>Numero de Doctores: {queryInfo.data?.length}</h4>
// }

// export default function DoctorTest() {
//   return (
//     <>
//       <Text fontSize='5xl'>Doctor List</Text>
//       <DoctorCount />
//       <DoctorList />
//     </>
//   )
// }

// const useDoctors = () => {
//   return useQuery('doctors1', () =>
//     fetch('http://localhost:3001/doctors').then(res => res.json())
//   )
// }
