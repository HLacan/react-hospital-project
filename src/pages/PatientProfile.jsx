import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Center,
  Divider,
  Text,
  Wrap,
} from '@chakra-ui/react'
import { deleteAdmission, getPatientAdmissions } from 'api/admissionApi'
import { getPatient } from 'api/patientApi'
import { deleteVisit, getPatientVisits } from 'api/visitApi'
import ActionButtons from 'components/ActionButtons'
import AdmissionFormModal from 'components/AdmissionFormModal'
import CText from 'components/CText'
import VisitFormModal from 'components/VisitFormModal'
import WrapItem from 'components/WrapItem'
import useModalContext from 'hooks/useModalContext'
import queryClient from 'queryClient'
import { useMutation, useQuery } from 'react-query'
import { useParams } from 'react-router-dom'

const PatientProfilePage = () => {
  const { openVisitModal, openAdmissionModal, openPatientModal } =
    useModalContext()

  const { id } = useParams()

  const valueId = [
    {
      patientId: id,
    },
  ]

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

  const { mutate: delVisit } = useMutation(deleteVisit, {
    onSuccess: () => {
      queryClient.invalidateQueries('visits')
    },
  })

  const { mutate: delAdmission } = useMutation(deleteAdmission, {
    onSuccess: () => {
      queryClient.invalidateQueries('admissions')
    },
  })

  const handleEditPatient = () => {
    openPatientModal(patient)
  }

  const handleEdit = (data, type) => event => {
    event.stopPropagation()
    if (type === 'visit') {
      openVisitModal(data)
    } else if (type === 'admission') {
      console.log('modal admision')
      openAdmissionModal(data)
    }
  }

  const handleDelete = (data, type) => event => {
    event.stopPropagation()
    if (window.confirm('Borrar este registro??')) {
      if (type === 'visit') {
        delVisit(data.id)
      } else if (type === 'admission') {
        delAdmission(data.id)
      }
    }
  }

  return (
    <>
      <Center>
        <Text fontSize='3xl' margin={4}>
          Datos del Paciente
        </Text>
      </Center>

      <Center>
        <Button colorScheme='yellow' onClick={handleEditPatient}>
          Editar
        </Button>
      </Center>

      <Wrap spacing='30px' justify='left' margin={5}>
        <WrapItem title='Nombre'>{patient.name}</WrapItem>
        <WrapItem title='Apellido'>{patient.lastName}</WrapItem>
        <WrapItem title='DPI'>{patient.dpi}</WrapItem>
        <WrapItem title='Fecha'>{patient.birthday}</WrapItem>
        <WrapItem title='Telefono'>{patient.phoneNumber}</WrapItem>
      </Wrap>

      <Divider margin={10} orientation='horizontal' borderColor='gray' />

      <Center margin={5}>
        <Text fontSize='3xl'>Visitas</Text>
        <ActionButtons newObj={() => openVisitModal(valueId[0])} isNew={true} />
      </Center>

      <Accordion allowMultiple>
        {visits?.map(visit => (
          <Box key={visit.id}>
            <AccordionItem marginBottom={5}>
              <h2>
                <AccordionButton
                  backgroundColor='gray.200'
                  _hover={{
                    bg: 'gray.300',
                  }}
                >
                  <Box flex='1' textAlign='left'>
                    <Text fontSize='xl'>Entrada: {visit.visitDate}</Text>
                  </Box>

                  <ActionButtons
                    edit={handleEdit(visit, 'visit')}
                    del={handleDelete(visit, 'visit')}
                    isNew={false}
                  />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4} backgroundColor='#ECF3DC'>
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

      <Center margin={5}>
        <Text fontSize='3xl'>Admisiones</Text>
        <ActionButtons
          newObj={() => openAdmissionModal(valueId[0])}
          isNew={true}
        />
      </Center>

      <Accordion allowMultiple>
        {admissions?.map(admission => (
          <Box key={admission.id}>
            <AccordionItem marginBottom={5}>
              <h2>
                <AccordionButton
                  backgroundColor='#E3E3E2'
                  _hover={{
                    background: '#96948F',
                  }}
                >
                  <Box flex='1' textAlign='left'>
                    <Text fontSize='xl'>
                      Entrada: {admission.admissionDate}
                    </Text>
                  </Box>
                  <ActionButtons
                    edit={handleEdit(admission, 'admission')}
                    del={handleDelete(admission, 'admission')}
                    isNew={false}
                  />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4} backgroundColor='#ECF3DC'>
                <CText title='Motivo'>{admission.reason}</CText>
                <CText title='Cama'>{admission.bedId}</CText>
                <CText title='Doctor'>{admission.doctorId}</CText>
              </AccordionPanel>
            </AccordionItem>
          </Box>
        ))}
      </Accordion>
      <VisitFormModal />
      <AdmissionFormModal />
    </>
  )
}

export default PatientProfilePage
