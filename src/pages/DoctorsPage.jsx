import {
  Center,
  Divider,
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
import { deleteDoctor, getDoctors } from 'api/doctorApi'
import ActionButtons from 'components/ActionButtons'
import useModalContext from 'hooks/useModalContext'
import queryClient from 'queryClient'
import { useMutation, useQuery } from 'react-query'
import { useNavigate } from 'react-router-dom'

export default function DoctorsPage() {
  const { openDoctorModal } = useModalContext()
  const navigate = useNavigate()

  const {
    isLoading,
    isFetching,
    error,
    data: doctors,
  } = useQuery('doctors', getDoctors)

  const handleClick = doctor => () => {
    navigate(`./${doctor.id}`)
  }

  const { mutate } = useMutation(deleteDoctor, {
    onSuccess: () => {
      queryClient.invalidateQueries('doctors')
    },
  })

  const handleEdit = doctor => event => {
    event.stopPropagation()
    openDoctorModal(doctor)
  }

  const handleDelete = doctor => event => {
    event.stopPropagation()
    if (window.confirm('Borrar este Registro??')) {
      mutate(doctor.id)
    }
  }

  return (
    <>
      <Center>
        <Text fontSize='4xl' marginTop={10}>
          Doctores{' '}
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
      </Center>
      <br />
      <Divider orientation='horizontal' borderColor='gray' />
      <br />
      <TableContainer margin={3}>
        <Table variant='simple' size='sm' colorScheme='facebook'>
          <Thead>
            <Tr backgroundColor='#D6D5C3' h='50'>
              <Th>Id</Th>
              <Th>DPI</Th>
              <Th>Nombre</Th>
              <Th>Apellido</Th>
              <Th>phoneNumber</Th>
              <Th>Acciones</Th>
            </Tr>
          </Thead>
          <Tbody>
            {doctors?.map(doctor => (
              <Tr
                key={doctor.id}
                onClick={handleClick(doctor)}
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
                <Td>
                  <ActionButtons
                    edit={handleEdit(doctor)}
                    del={handleDelete(doctor)}
                  />
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
      {error ? <pre>error.message</pre> : null}
    </>
  )
}
