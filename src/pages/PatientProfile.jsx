import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Center,
  Divider,
  Text,
  Wrap,
} from '@chakra-ui/react'
import { getPatientAdmissions } from 'api/admissionApi'
import { getPatient } from 'api/patientApi'
import { getPatientVisits } from 'api/visitApi'
import CText from 'components/CText'
import WrapItem from 'components/WrapItem'
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

  const { data: visits } = useQuery(['visit', id], () => getPatientVisits(id), {
    initialData: queryClient.getQueryData('visits'),
  })

  const { data: admissions } = useQuery(
    ['admission', id],
    () => getPatientAdmissions(id),
    {
      initialData: queryClient.getQueryData('admissions'),
    }
  )

  const handleEdit = () => {
    openPatientModal(patient)
  }

  return (
    <>
      <Center>
        <Text fontSize='3xl' margin={4}>
          Datos del Paciente
        </Text>
      </Center>

      <Wrap spacing='30px' justify='center' margin={5}>
        <WrapItem title='Nombre'>{patient.name}</WrapItem>
        <WrapItem title='Apellido'>{patient.lastName}</WrapItem>
        <WrapItem title='DPI'>{patient.dpi}</WrapItem>
        <WrapItem title='Fecha'>{patient.birthday}</WrapItem>
        <WrapItem title='Telefono'>{patient.phoneNumber}</WrapItem>
      </Wrap>

      <Divider margin={10} orientation='horizontal' borderColor='gray' />

      <Center>
        <Text fontSize='3xl'>Visitas</Text>
      </Center>

      <Accordion allowMultiple>
        {visits?.map(visit => (
          <Box key={visit.id}>
            <AccordionItem>
              <h2>
                <AccordionButton
                  backgroundColor='#DDDDDD'
                  _hover={{
                    background: '#969696',
                  }}
                >
                  <Box flex='1' textAlign='left'>
                    <Text fontSize='xl'>Entrada: {visit.visitDate}</Text>
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                <CText title='Motivo'>{visit.reason}</CText>
                <CText title='Diagnostico'>{visit.diagnostic}</CText>
                <CText title='Tratamiento'>{visit.treatment}</CText>
                <CText title='Doctor'>{visit.doctorId}</CText>
              </AccordionPanel>
            </AccordionItem>
          </Box>
        ))}
      </Accordion>

      <Divider margin={10} orientation='horizontal' borderColor='gray' />

      <Center>
        <Text fontSize='3xl'>Ingresos</Text>
      </Center>

      <Accordion allowMultiple>
        {admissions?.map(admission => (
          <Box key={admission.id}>
            <AccordionItem>
              <h2>
                <AccordionButton
                  backgroundColor='#DDDDDD'
                  _hover={{
                    background: '#969696',
                  }}
                >
                  <Box flex='1' textAlign='left'>
                    <Text fontSize='xl'>
                      Entrada: {admission.admissionDate}
                    </Text>
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                <CText title='Motivo'>{admission.reason}</CText>
                <CText title='Cama'>{admission.bedId}</CText>
                <CText title='Doctor'>{admission.doctorId}</CText>
              </AccordionPanel>
            </AccordionItem>
          </Box>
        ))}
      </Accordion>
    </>
  )
}

export default PatientProfilePage
