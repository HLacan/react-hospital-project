import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Center,
  Container,
  Divider,
  Text,
  Wrap,
  WrapItem,
} from '@chakra-ui/react'
import { getPatientHistories } from 'api/historyApi'
import { getPatient } from 'api/patientApi'
import useModalContext from 'hooks/useModalContext'
import queryClient from 'queryClient'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'

const PatientProfilePage = () => {
  const { id } = useParams()

  const { openPatientModal } = useModalContext()

  const { data: patient } = useQuery(['ticket', id], () => getPatient(id), {
    initialData:
      queryClient
        .getQueryData('patients')
        ?.find(patient => patient.id === id) || {},
  })

  const { data: histories } = useQuery(
    ['history', id],
    () => getPatientHistories(id),
    {
      initialData: queryClient.getQueryData('histories'),
    }
  )

  const handleEdit = () => {
    openPatientModal(patient)
  }

  return (
    <>
      <Center>
        <Text fontSize='5xl'>Datos del Paciente</Text>
      </Center>

      <Divider orientation='horizontal' />

      <Container maxW='8xl'>
        <Wrap spacing='50px' justify='center'>
          <WrapItem>
            <Box w='500px' h='full' p='4' bg='gray.200' borderRadius='xl'>
              <Text fontSize='3xl'>Nombre</Text>
              <Divider borderColor='black' padding={1} />
              <Text fontSize='2xl'>{patient.name}</Text>
            </Box>
          </WrapItem>
        </Wrap>
      </Container>

      <Accordion defaultIndex={[0]} allowMultiple>
        {histories?.map(history => (
          <AccordionItem key={history.id}>
            <h2>
              <AccordionButton>
                <Box flex='1' textAlign='left'>
                  <Text fontSize='xl'>
                    Entrada: {history.arrivalDate} ----- Salida:{' '}
                    {history.departureDate}
                  </Text>
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>Nada xD</AccordionPanel>
          </AccordionItem>
        ))}
      </Accordion>
    </>
  )
}

export default PatientProfilePage
