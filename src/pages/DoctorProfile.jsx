import { Button, Center, Text, Wrap } from '@chakra-ui/react'
import { getDoctor } from 'api/doctorApi'
import WrapItem from 'components/WrapItem'
import useModalContext from 'hooks/useModalContext'
import queryClient from 'queryClient'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'

const DoctorProfile = () => {
  const { openDoctorModal } = useModalContext()
  const { id } = useParams()

  const { data: doctor } = useQuery(['doctor', id], () => getDoctor(id), {
    initialData:
      queryClient.getQueryData('doctors')?.find(doctor => doctor.id === id) ||
      {},
  })

  const handleEdit = () => {
    openDoctorModal(doctor)
  }

  return (
    <>
      <Center>
        <Text fontSize='3xl' margin={4}>
          Datos del doctor
        </Text>
      </Center>

      <Center>
        <Button colorScheme='yellow' onClick={handleEdit}>
          Editar
        </Button>
      </Center>

      <Wrap spacing='30px' justify='left' margin={5}>
        <WrapItem title='Nombre'>{doctor.name}</WrapItem>
        <WrapItem title='Apellido'>{doctor.lastName}</WrapItem>
        <WrapItem title='DPI'>{doctor.dpi}</WrapItem>
        <WrapItem title='Telefono'>{doctor.phoneNumber}</WrapItem>
      </Wrap>
    </>
  )
}

export default DoctorProfile
