import { EditIcon } from '@chakra-ui/icons'
import {
  Center,
  IconButton,
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
import { deletePatient, getPatients } from 'api/patientApi'
import useModalContext from 'hooks/useModalContext'
import queryClient from 'queryClient'
import { useMutation, useQuery } from 'react-query'
import { useNavigate } from 'react-router-dom'

export default function PatientPage() {
  const { openPatientModal } = useModalContext()
  const navigate = useNavigate()

  const {
    isLoading,
    isFetching,
    error,
    data: patients,
  } = useQuery('patients', getPatients)

  const { mutate } = useMutation(deletePatient, {
    onSuccess: () => {
      queryClient.invalidateQueries('patients')
    },
  })

  const handleClick = patient => () => {
    navigate(`./${patient.id}`)
  }

  const handleEdit = patient => event => {
    event.stopPropagation()
    openPatientModal(patient)
  }

  const handleDelete = patient => event => {
    event.stopPropagation()
    if (window.confirm('Borrar este paciente??')) {
      mutate(patient.id)
    }
  }

  return (
    <>
      <Center>
        <Text fontSize='5xl' style={{ textAlign: Center }}>
          Patient List{' '}
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

      <TableContainer>
        <Table variant='simple'>
          <Thead>
            <Tr>
              <Th>Id</Th>
              <Th>Nombre</Th>
              <Th>Apellido</Th>
              <Th>DPI</Th>
              <Th>Fecha de Nacimiento</Th>
              <Th>Telefono</Th>
              <Th>Opciones</Th>
            </Tr>
          </Thead>
          <Tbody>
            {patients?.map(patient => (
              <Tr
                key={patient.id}
                onClick={handleClick(patient)}
                _hover={{
                  texDecoration: 'none',
                  bg: 'gray.200',
                  cursor: 'pointer',
                }}
              >
                <Td>{patient.id}</Td>
                <Td>{patient.name}</Td>
                <Td>{patient.lastName}</Td>
                <Td>{patient.dpi}</Td>
                <Td>{patient.birthday}</Td>
                <Td>{patient.phoneNumber}</Td>
                <Td>
                  <IconButton
                    colorScheme='yellow'
                    icon={<EditIcon />}
                    onClick={handleEdit(patient)}
                  ></IconButton>
                  <IconButton
                    colorScheme='yellow'
                    icon={<EditIcon />}
                    onClick={handleDelete(patient)}
                  ></IconButton>
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
