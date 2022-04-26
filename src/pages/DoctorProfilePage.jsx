import { Spinner, Text } from '@chakra-ui/react'
import { getDoctor } from 'api/doctorApi'
import queryClient from 'queryClient'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'

const DoctorProfilePage = () => {
  const { id } = useParams()

  const {
    isLoading,
    isFetching,
    data: doctor,
  } = useQuery(['doctor', id], () => getDoctor(id), {
    initialData:
      queryClient.getQueryData('doctors')?.find(doctor => doctor.id === id) ||
      {},
  })

  return (
    <div>
      <Text fontSize='6xl'>
        {doctor.id} {isLoading || isFetching ? <Spinner /> : null}
      </Text>

      <Text fontSize='6xl'>{doctor.dpi}</Text>
    </div>
  )
}

export default DoctorProfilePage
