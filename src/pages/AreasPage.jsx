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
import { deleteArea, getAreas } from 'api/areaApi'
import ActionButtons from 'components/ActionButtons'
import useModalContext from 'hooks/useModalContext'
import queryClient from 'queryClient'
import { useMutation, useQuery } from 'react-query'
import { useNavigate } from 'react-router-dom'

export default function AreasPage() {
  const { openAreaModal } = useModalContext()
  const navigate = useNavigate()

  const {
    isLoading,
    isFetching,
    error,
    data: areas,
  } = useQuery('areas', getAreas)

  const handleClick = area => () => {
    navigate(`./${area.id}`)
  }

  const { mutate } = useMutation(deleteArea, {
    onSuccess: () => {
      queryClient.invalidateQueries('areas')
    },
  })

  const handleEdit = area => event => {
    event.stopPropagation()
    openAreaModal(area)
  }

  const handleDelete = area => event => {
    event.stopPropagation()
    if (window.confirm('Borrar esta Area??')) {
      mutate(area.id)
    }
  }

  return (
    <>
      <Center>
        <Text fontSize='4xl' marginTop={10}>
          Areas{' '}
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
              <Th>Nombre</Th>
              <Th>Opciones</Th>
            </Tr>
          </Thead>
          <Tbody>
            {areas?.map(area => (
              <Tr
                key={area.id}
                onClick={handleClick(area)}
                _hover={{
                  texDecoration: 'none',
                  bg: 'gray.200',
                  cursor: 'pointer',
                }}
              >
                <Td>{area.id}</Td>
                <Td>{area.name}</Td>
                <Td>
                  <ActionButtons
                    edit={handleEdit(area)}
                    del={handleDelete(area)}
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
