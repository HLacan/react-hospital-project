import {
  Button,
  Center,
  Divider,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  VisuallyHidden,
  Wrap,
} from '@chakra-ui/react'
import { getArea } from 'api/areaApi'
import { deleteBed, getAreaBeds } from 'api/bedApi'
import ActionButtons from 'components/ActionButtons'
import BedFormModal from 'components/BedFormModal'
import WrapItem from 'components/WrapItem'
import useModalContext from 'hooks/useModalContext'
import queryClient from 'queryClient'
import { useMutation, useQuery } from 'react-query'
import { useParams } from 'react-router-dom'

const AreaProfilePage = () => {
  const { openBedModal, openAreaModal } = useModalContext()

  const { id } = useParams()

  const valueId = [
    {
      areaId: id,
    },
  ]

  const { mutate } = useMutation(deleteBed, {
    onSuccess: () => {
      queryClient.invalidateQueries('beds')
    },
  })

  const { data: area } = useQuery(['area', id], () => getArea(id), {
    initialData:
      queryClient.getQueryData('areas')?.find(area => area.id === id) || {},
  })

  const { data: beds } = useQuery(['bed', id], () => getAreaBeds(id), {
    initialData: queryClient.getQueryData('beds'),
  })

  const handleEditArea = () => {
    openAreaModal(area)
  }

  const handleEdit = bed => event => {
    event.stopPropagation()
    openBedModal(bed)
  }

  const handleDelete = bed => event => {
    event.stopPropagation()
    if (window.confirm('Borrar esta cama??')) {
      mutate(bed.id)
    }
  }

  return (
    <>
      <Center>
        <Text fontSize='3xl' margin={4}>
          Datos de area
        </Text>
      </Center>

      <Center>
        <Button colorScheme='yellow' onClick={handleEditArea}>
          Editar
        </Button>
      </Center>

      <Wrap spacing='30px' justify='center' margin={5}>
        <WrapItem title='Nombre del area'>{area.name}</WrapItem>
      </Wrap>

      <Divider margin={10} orientation='horizontal' borderColor='gray' />

      <Center margin={5}>
        <Text fontSize='3xl'>Camas Asignadas</Text>
        <ActionButtons newObj={() => openBedModal(valueId[0])} isNew={true} />
      </Center>

      <TableContainer backgroundColor=' #e8e8e8' marginBottom={20}>
        <Table variant='simple'>
          <Thead>
            <Tr backgroundColor='lightgray'>
              <Th>Id</Th>
              <Th>Estado</Th>
              <VisuallyHidden>
                <Th>Area</Th>
              </VisuallyHidden>
              <Th>Opciones</Th>
            </Tr>
          </Thead>
          <Tbody>
            {beds?.map(bed => (
              <Tr
                key={bed.id}
                _hover={{
                  texDecoration: 'none',
                  bg: '#b3b3b3',
                }}
              >
                <Td>{bed.id}</Td>
                <Td>{bed.status}</Td>
                <VisuallyHidden>
                  <Td>{bed.areaId}</Td>
                </VisuallyHidden>
                <Td>
                  <ActionButtons
                    edit={handleEdit(bed)}
                    del={handleDelete(bed)}
                  />
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
      <BedFormModal />
    </>
  )
}

export default AreaProfilePage
